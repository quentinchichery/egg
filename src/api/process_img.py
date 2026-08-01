import argparse
import os
import shutil
from pathlib import Path

import pandas as pd
from PIL import Image

SCRIPT_DIR = Path(__file__).resolve().parent

# Responsive variants generated for every picture: a small one for grid/popup
# thumbnails and a bigger one for higher pixel-density screens.
VARIANT_SIZES = {
    "400": (400, 400),
    "800": (800, 800),
}


def get_id_list(csv_path: str) -> list[int]:
    df = pd.read_csv(csv_path, delimiter=";")
    return df['id'].unique()


def create_thumbnails(input_folder: str, output_folder: str, ids: list[int], variant_sizes=VARIANT_SIZES):
    input_path = Path(input_folder)
    output_path = Path(output_folder)

    # Create the output folder if it doesn't exist
    if output_path.exists():
        shutil.rmtree(output_path)
    output_path.mkdir(parents=True)

    # Loop through all files in the input folder
    for filename in os.listdir(input_path):
        if not filename.endswith(('.jpg', '.jpeg', '.png', '.gif')):
            continue
        photo_id = filename.split('.')[0]
        if int(photo_id) not in ids:
            continue

        with Image.open(input_path / filename) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')

            for suffix, size in variant_sizes.items():
                variant = img.copy()
                variant.thumbnail(size)
                variant.save(output_path / f"{photo_id}-{suffix}.jpg", "JPEG", quality=82, optimize=True)
                variant.save(output_path / f"{photo_id}-{suffix}.webp", "WEBP", quality=80)

            # Keep a plain `{id}.jpg` (largest variant) for backward compatibility
            # with any code still referencing the un-suffixed filename.
            largest_suffix = max(variant_sizes, key=lambda key: variant_sizes[key][0])
            shutil.copyfile(
                output_path / f"{photo_id}-{largest_suffix}.jpg",
                output_path / f"{photo_id}.jpg",
            )


def check_place_has_picture(output_folder: str, ids: list[int]):
    output_path = Path(output_folder)
    picture_ids = {int(f.split('-')[0].split('.')[0]) for f in os.listdir(output_path)}
    diff = list(set(ids) - picture_ids)
    print(f"Places without pictures: {diff}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Génère les vignettes (JPEG + WebP, 400px et 800px) servies par le site "
                     "à partir des photos sources et de processed-data.csv."
    )
    parser.add_argument(
        "--input-folder",
        type=Path,
        required=True,
        help="Dossier contenant les photos sources (non versionné dans le repo)",
    )
    parser.add_argument(
        "--csv",
        type=Path,
        default=SCRIPT_DIR / "processed-data.csv",
        help="Chemin de processed-data.csv (défaut: src/api/processed-data.csv)",
    )
    parser.add_argument(
        "--output-folder",
        type=Path,
        default=SCRIPT_DIR.parent.parent / "public" / "restaurant_pictures",
        help="Dossier de sortie (défaut: public/restaurant_pictures)",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    ids = get_id_list(str(args.csv))
    print(f"There are {len(ids)} places ids.")
    print("processing ...")

    create_thumbnails(str(args.input_folder), str(args.output_folder), ids)
    check_place_has_picture(str(args.output_folder), ids)

