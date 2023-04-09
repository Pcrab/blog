import Hexo from "hexo";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

const BASE_URL = "https://pcrab.xyz";

// const isExternal = (url) => {
//     if (url.beginWith(BASE_URL) || url.beginWith("/")) {
//         return false;
//     }

//     return true;
// }

const main = async () => {
    const hexo = new Hexo(process.cwd(), {
        silent: true,
    });
    console.log("Hexo created");

    const dbPath = join(hexo.base_dir, "db.json");
    if (existsSync(dbPath)) {
        unlinkSync(dbPath);
    }
    console.log("DB initializing");

    await hexo.init();

    hexo.extend.filter.register("marked:renderer", (renderer) => {
        renderer.link = (href, _, text) => {
            return `<a href="${href}" target="_blank">${text}</a>`;
        }

        return renderer;
    });

    await hexo.load(null);
    console.log("Hexo initialized");

    if (hexo.env.init && hexo._dbLoaded) {
        await hexo.database.save();
    }
    console.log("Finish");
};

void main();