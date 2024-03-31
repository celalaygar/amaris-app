import ApiService from "./base/ApiService";




const NOTE_URL = '/note'
class UserService {

    get(url) {
        return ApiService.get(url)
    }
    search(body) {
        return ApiService.post(NOTE_URL + "/search", body)
    }
    save(body) {
        return ApiService.post(NOTE_URL + "/save", body)
    }
    update(body) {
        return ApiService.put(NOTE_URL + "/update", body)
    }
    delete(body) {
        return ApiService.post(NOTE_URL + "/delete", body)
    }
    findById(body) {
        return ApiService.post(NOTE_URL + "/findById", body)
    }

    getNotesWithPagination(page, size) {
        let url = '/search?page=' + page + '&size=' + size;
        return ApiService.get(NOTE_URL + url);
    }
}

export default new UserService();