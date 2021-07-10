import axios from "axios"
const url = "http://localhost:3001/persons"

const request = (response) => {
    return response.then(r => r.data)
}

const getAll = () => {
    return request(axios.get(url))
}

const create = newObject => {
    return request(axios.post(url, newObject))
}

const update = (id, newObject) => {
    return request(axios.put(`${url}/${id}`, newObject))
}

const deleteNumber = id => {
    return request(axios.delete(`${url}/${id}`))
}

export default { getAll, create, update, deleteNumber }
  