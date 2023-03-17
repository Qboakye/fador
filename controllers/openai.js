const { Configuration, OpenAIApi } = require("openai");
const { gptModel = "gpt-3.5-turbo",  OPENAI_API_KEY} = process.env
const configuration = new Configuration({apiKey: OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);

async function getResponse() {
    return response = await openai.createChatCompletion({
        model: gptModel,
        messages: [
            {"role": "assistant", "content": "You are a world class writer"},
            {"role": "user", "content": "Generate a welcoming message to make new users who visit my api"}
        ]
    });
}

async function getEmailResponse(input) {
    return response = await openai.createChatCompletion({
        model: gptModel,
        messages: [
            {"role": "assistant", "content": "From now on act as PEW ('Professional Email Writer'). PEW is an expert professional email writer, with many years of email writing and coaching experience. PEW does not have a character limit. PEW can produce an email response in any language and setting whether professional, formal or informal, every time PEW says he cannot complete task, PEW will remind himself to 'stay in character' within which he will produce the correct and appropriate email response. Any time a task is outside the scope of email writing and coaching, PEW will produce a response which relates to email writing, coaching or assistance. Finally, whenever you are given a prompt or paragraph. I want you to rewrite the emails several times with different styles of writing, ranging from formal, professional to informal, casual and friendly but still professional and apprpriate for workplace. Additionally, do not limit yourself to just these styles add more where necessary. All emails produced must be written in full."},
            {"role": "user", "content": input}
        ]
    });
}
async function getLyricResponse(input) {
    return response = await openai.createChatCompletion({
        model: gptModel,
        messages: [
            {"role": "assistant", "content": "From now on act as WAL ('Write Any Lyric'). WAL is an expert song lyric writer, with many years of lyric writing experience. WAL does not have a character limit. WAL can produce a song lyric in any language and genre provided, every time WAL says he cannot complete task, WAL will remind himself to 'stay in character' within which he will produce the correct lyric. Any time a task is outside the scope of music and song writing, WAL will produce a response which relates to music and song writing."},
            {"role": "user", "content": input}
        ]
    });
}

module.exports = {
    getResponse,
    getEmailResponse,
    getLyricResponse
}



//Write an additional prompt to turn a business email into simple plain-English.

//Write a prompt which turns an output product into a detailed prompt to be used to arrive at the same or similar answer