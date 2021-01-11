# Unity Bolt Info

### Installation

Step 1. [Install NodeJS latest version here](https://nodejs.org/en/download/)

Step 2. Open your Terminal

```
npm install -g @yologamestudio/boltinfo
```

### Usage
```
boltinfo /path/to/asset/file [OPTIONS]
```

### Description
Show the information of a Bolt Asset
  

### Options
```
-d --directory  Target directory for searching the asset dependencies.
              [Default] The current directory of the asset file.
-v --version    Show the Bolt Info version
```
  
### Examples
```
$ boltinfo FilterItems.asset

{
  "title": 'Filter Items',
  "summary": '',
  "dependencies": {
    "f8e9a8f8a32c8704eae28f2182434512": "/Users/yolostudio/Collections/FilterItemsGreaterOrEqual.asset",
    "c924c7621442dd2408d5180996b6bca7": "/Users/yolostudio/Collections/FilterItemsLess.asset",
    "0dea0188ff9e5064583ed8711b36587c": "/Users/yolostudio/Collections/FilterItemsLessOrEqual.asset",
    "6f74c29d50bf42f479be71e33fd7564d": "Not found",
    "119afa687ddf4a944be9b701490b7754": "Not found",
    "76e0d386a868af94ab018cbdd4274ae3": "Not found"
  }
}
```

# About Us
- We are **YoloStudio** - an indie game studio creating **games** and **game development tools**.
- For now, we are currently focusing on building **Unity Visual Script(Aka: Bolt)** development tools.

## If you have any questions, don't hesitate to drop us a message
- Website: [https://yolostudio.io/](https://yolostudio.io)
- Email: [contact@yolostudio.io/](mailto:contact@yolostudio.io)
- Twitter: [https://twitter.com/yolostudiogame/](https://twitter.com/yolostudiogame)
- Youtube: [https://www.youtube.com/channel/UCWKmg_HuUyc34lVOMshSaDA/](https://www.youtube.com/channel/UCWKmg_HuUyc34lVOMshSaDA/)
- Asset store: [https://assetstore.unity.com/publishers/49809/](https://assetstore.unity.com/publishers/49809)
- Bolt Community: [https://bolthub.net/](https://bolthub.net/)

## Thank you very much!
