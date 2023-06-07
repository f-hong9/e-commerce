import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg5MmU5MWFiZmM1ODgwZTA1Nzc0OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NjExMTA4MSwiZXhwIjoxNjg2MzcwMjgxfQ.5kmFcjpCm_yrZILzPf4W2ugCqb-IaGrXJNldgXXJjM8";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})