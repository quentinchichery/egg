"""CLI d'orchestration du pipeline de données du site.

Étapes (voir README.md pour le détail) :
  1. csv-to-json : convertit un export CSV en src/data/restaurants.json
                    (géocode les adresses sans coordonnées via Nominatim).
  2. images      : génère les vignettes JPEG/WebP (400px et 800px) dans
                    public/restaurant_pictures/ à partir des photos sources.

Exemples :
    python main.py csv-to-json --csv "src/api/egg-database - 01-08-2026.csv"
    python main.py images --input-folder "../pictures"
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "src" / "api"))

import data_to_json
import process_img


def run_csv_to_json(args: argparse.Namespace) -> None:
    data_to_json.export_to_json(str(args.csv), str(args.json_out))


def run_images(args: argparse.Namespace) -> None:
    ids = process_img.get_id_list(str(args.csv))
    print(f"There are {len(ids)} places ids.")
    process_img.create_thumbnails(str(args.input_folder), str(args.output_folder), ids)
    process_img.check_place_has_picture(str(args.output_folder), ids)


def main() -> None:
    api_dir = Path(__file__).resolve().parent / "src" / "api"
    data_dir = Path(__file__).resolve().parent / "src" / "data"
    public_dir = Path(__file__).resolve().parent / "public" / "restaurant_pictures"

    parser = argparse.ArgumentParser(description="Pipeline de données soft boiled egg club")
    subparsers = parser.add_subparsers(dest="command", required=True)

    csv_parser = subparsers.add_parser("csv-to-json", help="Convertit un CSV en restaurants.json")
    csv_parser.add_argument("--csv", type=Path, required=True)
    csv_parser.add_argument("--json-out", type=Path, default=data_dir / "restaurants.json")
    csv_parser.set_defaults(func=run_csv_to_json)

    images_parser = subparsers.add_parser("images", help="Génère les vignettes JPEG/WebP")
    images_parser.add_argument("--input-folder", type=Path, required=True)
    images_parser.add_argument("--csv", type=Path, default=api_dir / "processed-data.csv")
    images_parser.add_argument("--output-folder", type=Path, default=public_dir)
    images_parser.set_defaults(func=run_images)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
