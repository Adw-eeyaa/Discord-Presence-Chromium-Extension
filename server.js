const { Client } = require('discord-rpc');
const cors = require('cors');
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;
const animeJSON = {
    "Gakusen Toshi Asterisk":"gakusentoshiasterisk_key",
    "Sousou no Frieren":"frieren_key",
    "Boku no Kokoro no Yabai Yatsu":"yabayatsu_key",
    "Kaiju No. 8":"kaiju_key",
    "Solo Leveling":"solo_lvling_key",
    "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san":"alyasan_key",
    "Make Heroine ga Oosugiru!":"makeheroine_key",
    '"Oshi no Ko" 2nd Season':"oshinoko_s2_key",
    "One Piece":"onepiece_key",
    "Fairy Tail: 100-nen Quest":"fairytail_key",
    "Gimai Seikatsu":"gimaiseikatsu_key",
    "Giji Harem":"gijiharem_key",
    "Isekai Shikkaku":"isekaishikkaku_key",
    "2.5-jigen no Ririsa":"jigen_key",
    "Tsue to Tsurugi no Wistoria":"tsue_key",
    "Kami no Tou: Ouji no Kikan":"kaminotou_key",
    "Shikanoko Nokonoko Koshitantan":"shikanoko_key",
    "Isekai Suicide Squad":"isekaisquad_key",
    "Nige Jouzu no Wakagimi":"nigejozu_key",
    "Monogatari Series: Off & Monster Season":"monogatari_key",
    "Fruits Basket: The Final":"fruits_basket_key",
    "Hibike! Euphonium 3":"hibike_key"
}
const clientId = '1207967686949212170'
const rpc = new Client({transport:'ipc'});
rpc.on('ready',()=>{
    console.log("Connected To Discord");
});
app.use(cors({
    origin:'chrome-extension://ocncfhmdkcnilpakelekfmjlggffceec'
}));
app.use(express.json());
async function updatePresence(animeDetails){
    
    try{

        const timeElapsed = animeDetails.timestamp;
        const timeMoment = timeElapsed.split(':').map(Number);
        const timeParts = timeElapsed.split(':').map(Number);
        const minutes = timeParts[0];
        const seconds = timeParts[1];
        const TotalSeconds = (minutes*60) + seconds;
        const currentTimestamp = Math.floor(Date.now()/1000);
        const startTime = currentTimestamp - TotalSeconds;

        let i = 0;
        rpc.setActivity({
            details:`Watching ${animeDetails.title}`,
            state:`Episode ${animeDetails.episode}`,
            largeImageKey:animeJSON[animeDetails.title] ? animeJSON[animeDetails.title]: "julis2",
            largeImageText:animeDetails.title,
            startTimestamp:startTime,
            smallImageKey:"play_button",
            smallImageText:"Click to Play",
            buttons:[{
                label:'Watch Now',
                url:'https://animepahe.ru'
            }]
        });
    }
    catch(error){
        console.error("Error Fetching Image URL:",error)
    }

}



app.post('/update',(req,res)=>{
    const animeDetail = req.body;
    updatePresence(animeDetail);
    res.status(200).send('Presence Updated');
})



rpc.login({clientId}).catch(console.error);
app.listen(PORT,()=>{
    console.log(`Listening on Port https://localhost:${PORT}`)
});