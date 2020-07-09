import { wordsData } from '../constants/constants';
export default async function getWords(page, category){
    const url = `${wordsData}page=${page - 1}&group=${category - 1}`;
    const response = await fetch (url);
    const data = await response.json();
    return data;
}
