import Axios from 'axios';
  

const baseUrl = "https://app-admin.webestfriends.com";
 

export default{
    login: (data,options) =>
    Axios.post(`${baseUrl}/Login/`,data,options),
    createAdmin: (data,options) =>
    Axios.post(`${baseUrl}/Admin_API/createAdminUser`,data,options),
    getUser: (options) =>
    Axios.get(`${baseUrl}/Admin_API/getAdminUser`,options),
   createStatus: (data,options) =>
    Axios.post(`${baseUrl}/Admin_API/updateStatus`,data,options),
   questionStatus: (data,options) =>
    Axios.post(`${baseUrl}/Category_API/updateQusStatus`,data,options),
    createCategory: (data,options) =>
    Axios.post(`${baseUrl}/Category_API/createCategory`,data,options),
    categoryStatus: (data,options) =>
    Axios.post(`${baseUrl}/Category_API/updateStatus`,data,options),
    getAllCategory: (options) =>
    Axios.get(`${baseUrl}/Category_API/getAllCategory`,options),
    getImage: (data,options) =>
    Axios.post(`${baseUrl}/AdminQuestion_API/optionImageUpload`,data,options),
    addQuestion: (data,options) =>
    Axios.post(`${baseUrl}/AdminQuestion_API/addQuestion`,data,options),
    getQuestions: (data,options) =>
    Axios.post(`${baseUrl}/AdminQuestion_API/addQuestion`,data,options),
    getUserCategory: (options) =>
    Axios.get(`${baseUrl}/Category/getAllCategory`,options),
    getCategory: (options) =>
    Axios.get(`${baseUrl}/Category_API/getAllCategory`,options),
    getCategory: (data,options) =>
    Axios.post(`${baseUrl}/Category/getCategoryById`,data,options),
    getQuestionlist: (data,options) =>
    Axios.post(`${baseUrl}/Questions`,data,options),
    createQuestionQuiz: (data,options) =>
    Axios.post(`${baseUrl}/Quiz/create`,data,options),
    getAdminQuiz: (data,options) =>
    Axios.post(`${baseUrl}/Quiz/playQuiz`,data,options),
    getResult: (data,options) =>
    Axios.post(`${baseUrl}/Quiz/submitScore`,data,options),
    getCreaterResult: (data,options) =>
    Axios.post(`${baseUrl}/Quiz/getAllResult`,data,options),
    bannerImage:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/quizImageUpload`,data,options),
    createQuiz:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/createQuiz`,data,options),
    getAllAdminQuiz:(options) =>
    Axios.get(`${baseUrl}/Admin_Quiz/getAllAdminQuiz`,options),
    getQuizBySlug:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/getQuizBySlug`,data,options),
    updateQuiz:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/updateQuiz`,data,options),
    updateQuizStatus:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/updateQuizStatus`,data,options),
    getAllResults:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/getAllResults`,data,options),
    getPlayerResult:(data,options) =>
    Axios.post(`${baseUrl}/Admin_Quiz/getPlayerResult`,data,options),
    getAllQuiz:(options) =>
    Axios.get(`${baseUrl}/Preset_Quiz/getAllAdminQuiz`,options),
    getQuiz:(data,options) =>
    Axios.post(`${baseUrl}/Preset_Quiz/getQuizBySlug`,data,options),
    saveAnswer:(data,options) =>
    Axios.post(`${baseUrl}/Preset_Quiz/saveAnswer`,data,options),
        // getTaskData: () =>
        // Axios.get(`${baseUrl}/task/getTaskData`),
        // getWorkFunction: (data,options) =>
        // Axios.post(`${baseUrl}/WorkFunction/getWorkFunction`,data,options),
        // addFunctionData: (data,options) =>
        // Axios.post(`${baseUrl}/WorkFunction/workFunctionData`,data,options),
        // getTaskData: () =>
        // Axios.get(`${baseUrl}/task/getTaskData`),
        // getAllFunction: () =>
        // Axios.get(`${baseUrl}/WorkFunction/getAllFunction`),
        // getWorkArea: () =>
        // Axios.get(`${baseUrl}/WorkArea/getWorkArea`),
        
    // addChannel: (body,options) =>
    //     Axios.post(`${baseUrl}/?c=API&m=createChannel`,body,options)
        
}

