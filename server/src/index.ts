import express from "express";
import { Client } from "@elastic/elasticsearch";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 3000;
const client = new Client({ node: "http://localhost:9200" });
const authKey = process.env.AUTH_KEY || "?";
if (authKey == "?")
    console.log("!!!! Please set AUTH_KEY to restrict access !!!!");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use((req, res, next) => {
    if (req.headers.authorization == authKey) next();
    else {
        res.sendStatus(403);
    }
});

app.post("/api/index", async (req, res) => {
    if (typeof req.body.url !== "string") return res.sendStatus(400);
    if (typeof req.body.content !== "string") return res.sendStatus(400);
    if (typeof req.body.title !== "string") return res.sendStatus(400);
    const body = <{ url: string; content: string; title: string }>req.body;
    await client.index({ index: "elastebsearch", body });
    res.sendStatus(200);
});

app.post("/api/search", async (req, res) => {
    if (typeof req.body.search !== "string") return res.sendStatus(400);
    const body = <{ search: string }>req.body;
    res.json(
        await client.search({
            index: "elastebsearch",
            body: {
                query: {
                    match: {
                        content: {
                            query: body.search,
                            fuzziness: "1"
                        }
                    }
                }
            }
        })
    );
});

app.listen(port, () => console.log("listening on port", port));
