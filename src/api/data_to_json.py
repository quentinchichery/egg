import pandas as pd
from geopy.geocoders import Nominatim
import time
import json


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
    for idx, row in df.iterrows():
        if pd.isna(df.loc[idx,'lat']) and pd.isna(df.loc[idx,'long']):
            lat, long = geocode_address(df.loc[idx,'addresse'])
            if lat != None and long != None:
                if lat < 49 and lat > 48:
                    df.loc[idx,'lat'] = lat
                if long < 3 and long > 2:
                    df.loc[idx,'long'] = long
            print(f"{df.loc[idx,'addresse']}: {df.loc[idx,'lat']}, {df.loc[idx,'long']} ")
            lat, long = None, None
            time.sleep(0.1)
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
    df.to_csv('processed-data.csv', sep=";", index=False, encoding="utf-8")

if __name__ == "__main__":
    csv_path = r"C:\Users\Quentin\Desktop\IT\potamApp\potam-app\src\api\20250128_data.csv"
    json_path = "../data/restaurants.json"
    export_to_json(csv_path, json_path)
