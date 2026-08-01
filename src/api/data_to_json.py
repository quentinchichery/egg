import argparse
from pathlib import Path

import pandas as pd
from geopy.geocoders import Nominatim
import time


SCRIPT_DIR = Path(__file__).resolve().parent


def geocode_address(address):
    geolocator = Nominatim(user_agent="optam")
    location = geolocator.geocode(address + ", FRANCE", timeout=10000)
    if location:
        return location.latitude, location.longitude
    return None, None


def export_to_json(csv_path: str, json_path: str) -> None:
    # read and process csv
    df = pd.read_csv(csv_path, delimiter=",")
    df = df.dropna(subset=['city'])
    df = df.astype({"id": int, "lat": float, "long": float, "name": str, "city": int, "craving":str, "tags": str, "addresse": str})
    df['tags'] = df['tags'].apply(lambda x: x.split('/'))
    print(df.head())

    # find_coordonates
    for idx, _ in df.iterrows():
        if pd.isna(df.loc[idx,'lat']) and pd.isna(df.loc[idx,'long']):
            lat, long = geocode_address(df.loc[idx,'addresse'])
            if lat != None and long != None:
                if lat < 49 and lat > 48:
                    df.loc[idx,'lat'] = lat
                if long < 3 and long > 2:
                    df.loc[idx,'long'] = long
            print(f"{df.loc[idx,'addresse']}: {df.loc[idx,'lat']}, {df.loc[idx,'long']} ")
            lat, long = None, None
            time.sleep(5)
        else:
            if (df.loc[idx,'lat'] > 49 or df.loc[idx,'lat'] < 48) and (df.loc[idx,'long'] > 3 or df.loc[idx,'long'] < 2):
                print(df.loc[idx,'addresse'])
                df.loc[idx,'lat'] = None
                df.loc[idx,'long'] = None
    
    # export json
    with open(json_path, 'w', encoding='utf-8') as file:
        df.to_json(file, orient="records", force_ascii=False)

    # export data for filtering

    # to do: 
    # sort by number of values

    cities = df['city'].unique()
    print(cities)
    cravings = df['craving'].unique()
    print(cravings)
    tags = df["tags"].explode().unique()
    print(tags)

    # export csv
    df['tags'] = df['tags'].apply(lambda x: '/'.join(x))
    processed_csv_path = SCRIPT_DIR / 'processed-data.csv'
    df.to_csv(processed_csv_path, sep=";", index=False, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convertit un export CSV en restaurants.json (+ processed-data.csv), "
                     "en géocodant les adresses sans coordonnées via Nominatim."
    )
    parser.add_argument(
        "--csv",
        type=Path,
        required=True,
        help="Chemin du CSV source (ex: 'egg-database - 01-08-2026.csv')",
    )
    parser.add_argument(
        "--json-out",
        type=Path,
        default=SCRIPT_DIR.parent / "data" / "restaurants.json",
        help="Chemin du JSON de sortie (défaut: src/data/restaurants.json)",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    export_to_json(str(args.csv), str(args.json_out))

