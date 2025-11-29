from PIL import Image
import os
import pandas as pd
import shutil


def get_id_list(csv_path: str) -> list[int]:
    df = pd.read_csv(csv_path, delimiter=";")
    return df['id'].unique()

def create_thumbnails(input_folder: str, output_folder: str, ids: list[int], thumbnail_size=(800, 600)):
    # Create the output folder if it doesn't exist
    if os.path.exists(output_folder):
        shutil.rmtree(output_folder)
    os.makedirs(output_folder)

    # Loop through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith(('.jpg', '.jpeg', '.png', '.gif')) and int(filename.split('.')[0]) in ids:
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            # Open the image
            with Image.open(input_path) as img:
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                # Create a thumbnail (resized) image
                img.thumbnail(thumbnail_size)
                # Save the thumbnail image to the output folder
                img.save(output_path)

def check_place_has_picture(output_folder: str, ids: list[int]):
    picture_ids = [int(filename.split('.')[0]) for filename in os.listdir(output_folder)]
    diff = list(set(ids) - set(picture_ids))
    print(f"Places without pictures: {diff}")


if __name__ == "__main__":
    input_folder = "../../../pictures"
    output_folder = "../../public/restaurant_pictures"
    thumbnail_size = (600, 600)
    ids = get_id_list(r"C:\Users\Quentin\Desktop\IT\potamApp\potam-app\src\api\processed-data.csv")
    print(f"There are {len(ids)} places ids.")
    print("processing ...")

    create_thumbnails(input_folder, output_folder, ids, thumbnail_size)
    check_place_has_picture(output_folder, ids)
