const { createStudent } = require('../../controllers/auth.controller');
const axios = require('axios');
const { createJobPost } = require('../../controllers/post.controller');
const { runQuery } = require('../../services/base-service');


const names = ['John', 'Jane', 'Doe', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Jack', 'Kate', 'Luke', 'Mary', 'Nancy', 'Oliver', 'Peter', 'Quinn', 'Rose', 'Steve', 'Tom', 'Ursula', 'Victor', 'Wendy', 'Xavier', 'Yvonne', 'Zack'];
const surnames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King'];

const cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai', 'Visaginas', 'Tauragė', 'Ukmergė', 'Plungė', 'Kretinga', 'Šilutė', 'Radviliškis', 'Palanga', 'Druskininkai', 'Rokiškis', 'Šakiai', 'Biržai', 'Gargždai', 'Kuršėnai', 'Elektrėnai', 'Jurbarkas', 'Garliava', 'Vilkaviškis'];

const technologiesArray = ['JavaScript', 'Python', 'Java', 'C#', 'PHP', 'C++', 'Ruby', 'Swift', 'Kotlin', 'TypeScript', 'Go', 'Rust', 'Scala', 'Perl', 'R', 'Haskell', 'Lua', 'Dart', 'Elixir', 'Clojure', 'Groovy', 'Julia', 'F#', 'Objective-C', 'Shell', 'PowerShell', 'Assembly', 'VHDL', 'Verilog', 'SQL', 'NoSQL', 'HTML', 'CSS', 'SASS', 'LESS'];

const languagesArray = ['English', 'Lithuanian', 'Russian', 'Polish', 'German', 'French'];

const universities = ['KTU', 'ODTU','ITU','VGTU','VU','MRU','LSMU','VM' ];


const generateRandomStudent = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const email = `${name.toLowerCase()}.${surname.toLowerCase()}${Math.floor(Math.random() * 10000000)}@gmail.com`;
    const password = 'password';
    const phone = `+370${Math.floor(Math.random() * 100000000)}`;
    const address = `${cities[Math.floor(Math.random() * cities.length)]} ${Math.floor(Math.random() * 100)}`;
    const school = universities[Math.floor(Math.random() * universities.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const technologies = [Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length)];
    const languages = [Math.floor(Math.random() * languagesArray.length), Math.floor(Math.random() * languagesArray.length), Math.floor(Math.random() * languagesArray.length)];
    const description = `I am a student at ${school} and I am looking for a job in ${city}. I am proficient in ${technologiesArray[technologies[0]]}, ${technologiesArray[technologies[1]]}, ${technologiesArray[technologies[2]]}. I speak ${languagesArray[languages[0]]}, ${languagesArray[languages[1]]}, ${languagesArray[languages[2]]}.`;
    const image = 'https://randomuser';
    const accountType = 'Student';

    return {
        name,
        surname,
        email,
        password,
        phone,
        address,
        school,
        city,
        technologies,
        languages,
        description,
        image,
        accountType
    };

};

const generateRandomEmployer = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const email = `${name.toLowerCase()}.${surname.toLowerCase()}${Math.floor(Math.random() * 10000000)}@gmail.com`;
    const password = 'password';
    const phone = `+370${Math.floor(Math.random() * 100000000)}`;
    const address = `${cities[Math.floor(Math.random() * cities.length)]} ${Math.floor(Math.random() * 100)}`;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const technologies = [Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length)];
    const languages = [Math.floor(Math.random() * languagesArray.length), Math.floor(Math.random() * languagesArray.length), Math.floor(Math.random() * languagesArray.length)];
    const description = `We are a company in ${city} looking for employees. We are looking for people proficient in ${technologiesArray[technologies[0]]}, ${technologiesArray[technologies[1]]}, ${technologiesArray[technologies[2]]}. We require knowledge of ${languagesArray[languages[0]]}, ${languagesArray[languages[1]]}, ${languagesArray[languages[2]]}.`;
    const image = 'https://randomuser';
    const accountType = 'Employer';
    const isInternshipRemote = Math.random() < 0.5;
    const isWorkRemote = Math.random() < 0.5;

    return {
        name,
        surname,
        email,
        password,
        phone,
        address,
        city,
        technologies,
        languages,
        description,
        image,
        accountType,
        isInternshipRemote,
        isWorkRemote
    };
};

const generateRandomLecturer = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const email = `${name.toLowerCase()}.${surname.toLowerCase()}${Math.floor(Math.random() * 10000000)}@gmail.com`;
    const password = 'password';
    const phone = `+370${Math.floor(Math.random() * 100000000)}`;
    const address = `${cities[Math.floor(Math.random() * cities.length)]} ${Math.floor(Math.random() * 100)}`;
    const description = `I am a lecturer at ${universities[Math.floor(Math.random() * universities.length)]}.`;
    const image = 'https://randomuser';
    const accountType = 'Lecturer';

    return {
        name,
        surname,
        email,
        password,
        phone,
        address,
        description,
        image,
        accountType
    };

};

let studentIDs = [];
let employerIDs = [];
let lecturerIDs = [];
let jobIDs = [];


let studentCount = 10000;
let employerCount = 10000;
let lecturerCount = 10000;
let postCount = 15000;
let jobCount = 20000;


const createStudents = async () => {
    for (let i = 0; i < studentCount; i++) {

        try{
            const response = await axios.post('http://localhost:8070/auth/register', generateRandomStudent());
            console.log(`Student ${i + 1} of ${studentCount} created`);
            studentIDs.push(response.data._id);
        }catch(err){
            console.log(err);
            break;
        }
        
    }
};

const createEmployers = async () => {
    for (let i = 0; i < employerCount; i++) {

        try{
            const response = await axios.post('http://localhost:8070/auth/register', generateRandomEmployer());
            console.log(`Employer ${i + 1} of ${employerCount} created`);
            employerIDs.push(response.data._id);
        }catch(err){
            console.log(err);
            employerCount++;
        }
        
    }
};

const createLecturers = async () => {
    for (let i = 0; i < lecturerCount; i++) {

        try{
            const response = await axios.post('http://localhost:8070/auth/register', generateRandomLecturer());
            console.log(`Lecturer ${i + 1} of ${lecturerCount} created`);
            lecturerIDs.push(response.data._id);
        }catch(err){
            console.log(err);
            lecturerCount++;
        }
        
    }
};

const generateRandomPost = () => {
    const title = 'title: ' + Math.floor(Math.random() * 1000);
    const description = 'description: ' + Math.floor(Math.random() * 1000);
    const company = 'company: ' + Math.floor(Math.random() * 1000);
    const role = 'role: ' + Math.floor(Math.random() * 1000);
    const studentId = studentIDs[Math.floor(Math.random() * studentIDs.length)]._id;
    const technologies = [Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length)];
    const image = 'https://picsum.photos/200';

    return {
        title,
        description,
        company,
        role,
        studentId,
        technologies,
        image
    };
    
};


const generateRandomJobPost = () => {
    const title = 'title: ' + Math.floor(Math.random() * 1000);
    const description = 'description: ' + Math.floor(Math.random() * 1000);
    const company = 'company: ' + Math.floor(Math.random() * 1000);
    const role = 'role: ' + Math.floor(Math.random() * 1000);
    const employerId = employerIDs[Math.floor(Math.random() * employerIDs.length)]._id;
    const technologies = [Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length), Math.floor(Math.random() * technologiesArray.length)];
    const image = 'https://picsum.photos/200';
    const isRemote = Math.random() < 0.5;
    const salary = Math.floor(Math.random() * 10000);

    return {
        title,
        description,
        company,
        role,
        employerId,
        technologies,
        image,
        isRemote,
        salary
    };
    
};
const createPosts = async () => {
    try {
        const studentIds = await runQuery('SELECT _id FROM `bitirme`.`students`');
        studentIDs = studentIds[0];


    
    
    
        for (let i = 0; i < postCount; i++) {
           
    
            try{
                const response = await axios.post('http://localhost:8070/posts/default/', generateRandomPost());
                console.log(`Post ${i + 1} of ${postCount} created`);
            }catch(err){
                console.log(err);
                jobCount++;
            }
        
        }
    }catch(err){
        console.log(err);
    }

};

const createJobPosts = async () => {

    try {
        const employerIds = await runQuery('SELECT _id FROM `bitirme`.`employers`');
        employerIDs = employerIds[0];
   

        for (let i = 0; i < jobCount; i++) {
            
            try{

                const response = await axios.post('http://localhost:8070/posts/job/', generateRandomJobPost());
                console.log(`Job ${i + 1} of ${jobCount} created`);
                jobIDs.push(response.data._id);

            }catch(err){
                console.log(err);
                jobCount++;
            }


        
        }
    
    }catch(err){
        console.log(err);
    }
};

const fillTheDB = async () => {
    // await createStudents();
    // await createEmployers();
    // await createLecturers();
    await createPosts();
    //await createJobPosts();
};

module.exports = {
    fillTheDB
};




    




