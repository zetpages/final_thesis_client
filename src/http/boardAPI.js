import {$authHost, $host} from "./index";
// import jwt_decode from "jwt-decode";


export const fetchAdmin = async () => {
    const {data} = await $authHost.get('api/admin/');
    return data;
}

export const createStudent = async (student) => {
    await $authHost.post('api/student/', student);
    return fetchStudent();
}

export const fetchRoom = async () => {
    const {data} = await $authHost.get('api/room/');
    return data;
}

export const createRoom = async (room) => {
    await $authHost.post('api/room/', room);
    return fetchRoom();
}

export const fetchBranch = async () => {
    const {data} = await $authHost.get('api/branch/');
    return data;
}

export const createBranch = async (branch) => {
    const {data} = await $authHost.post('api/branch/', branch);
    return data;
}

export const fetchStudent = async () => {
    const {data} = await $authHost.get('api/student/');
    // console.log("called fetch")
    return data;
}

export const removeOneStudent = async (id) => {
    const {data} = await $authHost.delete('api/student/' + id);
    return data;
}

export const removeOneRoom = async (id) => {
    await $authHost.delete('api/room/' + id);
    return fetchRoom()
}

export const removeOneGroup = async (id) => {
    const {data} = await $authHost.delete('api/group/' + id);
    return data;
}

export const fetchOneStudent = async (id) => {
    const {data} = await $authHost.get('api/student/' + id)
    return data;
}

export const deleteStudent = async (id) => {
    const {data} = await $authHost.delete(`api/student/${id}`);
    return data;
}

export const createTeacher = async (teacher) => {
    const {data} = await $authHost.post('api/teacher/', teacher);
    return data;
}

export const fetchTeacher = async () => {
    const {data} = await $authHost.get('api/teacher/');
    return data;
}

export const createGroup = async (group) => {
    const {data} = await $authHost.post('api/group/', group);
    return data;
}

export const fetchGroup = async () => {
    const {data} = await $authHost.get('api/group/');
    return data;
}

export const fetchOneGroup = async (id) => {
    const {data} = await $authHost.get('api/group/' + id)
    return data;
}

export const fetchRegularClass = async () => {
    const {data} = await $authHost.get('api/regular-classes/');
    return data;
}

export const createSubscription = async (subscription) => {
    const {data} = await $authHost.post('api/subscription/', subscription);
    return data;
}

export const fetchSubscription = async () => {
    const {data} = await $authHost.get('api/subscription/');
    return data;
}

export const createGender = async (gender) => {
    const {data} = await $authHost.post('api/gender/', gender);
    return data;
}

export const fetchGender = async () => {
    const {data} = await $authHost.get('api/gender/');
    return data;
}

export const createStStatus = async (status) => {
    const {data} = await $authHost.post('api/student-status/', status);
    return data;
}

export const fetchStStatus = async () => {
    const {data} = await $authHost.get('api/student-status/');
    return data;
}

