import json
import requests

# get all games from the online api
def getAllGames():
    headers = {
        'Content-Type': 'application/json',
    }
    # online api url for all steam games
    api_url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=BB7C2025C5AF751CEF5650354B24DCC9&format=json'
    response = requests.get(api_url, headers = headers)
    if response.status_code == 200:
        appContent = json.loads(response.content.decode('utf-8'))
        return appContent['applist']['apps']
    else:
        return None

# post all games to the local database
def postToDb():
    gameList = getAllGames()
    if (gameList == None):
        return
    database_url = 'http://localhost:5000/api/game'
    for game in gameList:
        print(game)
        game['game_id'] = game.pop('appid')  # set game_id key to have same value as appid key and remove appid key
        requests.post(database_url, game)

def main():
    postToDb()

if __name__ == '__main__':
    main()