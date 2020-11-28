# Unity Bolt Info
```
USAGE
  boltinfo /path/to/asset/file [OPTIONS]

DESCRIPTION:
  Show the information of a Bolt Asset
  
OPTIONS
  -d --directory  Target directory for searching the asset dependencies.
                  [Default] The current directory of the asset file.
  -v --version    Show the Bolt Info version
  
EXAMPLES
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
