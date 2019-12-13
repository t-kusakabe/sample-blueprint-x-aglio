# template-blueprint-aglio

## Usage

**Container Build**

```
docker-compose up -d --build
```

**Start API Documentation**

```
docker-compose exec api npm start
```

**Build only**

```
docker-compose exec api npm run build
```


## Directory Structure

```
.
├── apidocs
│   ├── layout.md
│   └── message.md
└── gulpfile.js
```

**apidocs/layout.md**

Main file.
All starting points.

**apidocs/message.md**
Subfile.
For example about message.
