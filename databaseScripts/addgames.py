import json
import requests

## get all games from the online api
def getAllGames():
    # Server Base URL and port
    headers = {
        'Content-Type': 'application/json',
    }
    api_url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=BB7C2025C5AF751CEF5650354B24DCC9&format=json'
    response = requests.get(api_url, headers = headers)
    if response.status_code == 200:
        appContent = json.loads(response.content.decode('utf-8'))
        return appContent['applist']['apps']
    else:
        return None

def postToDb():
    gameList = getAllGames()
    if (gameList == None):
        return
    database_url = 'http://localhost:5000/api/game'
    count = 0
    for game in gameList:
        print(game)
        requests.post(database_url, game)
        count += 1
        if (count > 3):
            return

def main():
    postToDb()

if __name__ == '__main__':
    main()