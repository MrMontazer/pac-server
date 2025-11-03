import uvicorn, json, yaml
from fastapi import FastAPI, Response

app = FastAPI()
get_config = lambda: yaml.safe_load(open("config.yml").read())

@app.get("/pac")
async def get_pac():
    script = open("pac.js").read()
    return Response(content=f"var CONFIG = {json.dumps(get_config())};\n{script}", media_type="text/javascript")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
