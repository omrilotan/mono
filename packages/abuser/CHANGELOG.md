# 2.0.0 - 2019-04-30
## Nodejs 12 support
Due to internal changes in require.resolve (paths option), moving internally to create a require instance (`createRequireFromPath`)

**API Change**: Accepts only one path argument (instead of multiple paths). It is now recommended to use this file as origin path `__filename` (although `__dirname` is also supported)
