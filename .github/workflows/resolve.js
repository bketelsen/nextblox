// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, removeFile, writeJSON } from 'https://deno.land/x/flat@0.0.10/mod.ts'

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const articles = json["articles"];
const categories = json["categories"];
const pages = json["pages"];
const feeds = json["feeds"];
const feeditems = json["feeditems"];
const images = json["images"];
const profiles = json["profiles"];
const sections = json["sections"];
const websites = json["websites"];

const rProfiles = resolveProfiles();
const rCategories = resolveCategories();
const rWebsites = resolveWebsites();
const rSections = resolveSections();
const rArticles = resolveArticles();
const rPages = resolvePages();

const newData = {
    articles: rArticles,
    profiles: rProfiles,
    categories: rCategories,
    websites: rWebsites,
    sections: rSections,
    pages: rPages,
    images: images,

}

// Step 3. Write a new JSON file with our filtered data
await writeJSON(filename, newData) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")

function resolve(id, collection) {
    return collection.find((p) => p["id"] === id)
}

function resolveProfiles() {
    return profiles.map((w) => {
        if (w.image_id) {
            w["image"] = resolve(w.image_id, images)
        }
        return w;
    })
}
function resolveSections() {
    return sections.map((w) => {
        if (w.image_id) {
            w["image"] = resolve(w.image_id, images)
        }
        return w;
    })
}
function resolveWebsites() {
    return websites.map((w) => {
        console.log(w)
        if (w.profile_id) {
            console.log(w.profile_id)
            console.log(rProfiles)
            w["profile"] = resolve(w.profile_id, rProfiles)
        }
        return w;
    })
}
function resolveCategories() {
    return categories.map((w) => {
        if (w.image_id) {
            w["image"] = resolve(w.image_id, images)
        }
        return w;
    })
}
function resolveArticles() {
    return articles.map((a) => {
        if (a.profile_id) {
            a["profile"] = resolve(a.profile_id, rProfiles)
        }
        if (a.image_id) {
            a["image"] = resolve(a.image_id, images)
        }
        if (a.category_id) {
            a["category"] = resolve(a.category_id, rCategories)
        }
        return a;
    })
}
function resolvePages() {
    return pages.map((a) => {
        if (a.image_id) {
            a["image"] = resolve(a.image_id, images)
        }
        if (a.category_id) {
            a["category"] = resolve(a.category_id, rCategories)
        }
        if (a.section_id) {
            a["section"] = resolve(a.section_id, rSections)
        }
        return a;
    })
}