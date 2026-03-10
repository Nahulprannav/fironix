const PROJECT_ID = "fironix-web";

async function checkDatabases() {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

checkDatabases().catch(console.error);
