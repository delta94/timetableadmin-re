/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./dashboard.css"
import '../timetable/timetable.css'
import "../../global/global.css"
import logo from "../../images/Logo.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import arrowD from "../../images/down-arrow.png"
import { CSSTransition} from "react-transition-group";
import {useQuery, useMutation} from "react-query"



const getLength = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/admin/count', {
        headers: {}
    })
    .then((response) => {
        return response.data
    })
}

const getCoursesT = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
        headers: {},
        params: {searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getRoomsT = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/room', {
        headers: {},
        params: {searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}


const getTRes = (tResponse, {uuid}) => {

    return axios.get(`https://tbe-node-deploy.herokuapp.com/timetable/generated?timetableId=${uuid}`, {
    })
    .then((response) => {
        return response
    })
}

const getTimetables = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/timetable/all', {
    })
    .then((response) => {
        return response
    })
}

const postTimetable = (args) => {

    var group1 = {}
    var group2 = []
    var group3 = {}
    var group4 = []

    args.roomsT.data.forEach((ar)=> {
        group1 = { ...group1,
            [ar.name]: {
                capacity: ar.capacity,
                type: 'theory'
            }
        }
    })

    args.coursesT.data.forEach((arr)=> {
        group2= [
            ...group2,
            {
            name: arr.name,
            lecturer: arr.lecturer[0].name,
            type: 'theory',
            students: arr.number,
            unit: arr.unit,
            code: arr.code
        }]
    })

    for (var i = 0; i < args.datum.length; i++) {
        group4.push(args.datum[i])
    }

    group3 = {
        'timetableName': document.querySelector('.name').value,
        'academicSession': document.querySelector('.aca-period').value,
        'timetableId': args.uuid,
        'selectedDay': group4,
        'classroom': group1,
        'courses': group2
    }

    console.log(group3)

    return axios.post('https://tbe-node-deploy.herokuapp.com/timetable/new', group3, {
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response;
    })
    .then((error)=> {
        return error
    })
}


const Dashboard = (props) => {
    const [timetableFn, {status}] = useMutation(postTimetable, {
        onSuccess: () => {
            console.log("created")
            setCreated(true)
            setModalOut(false)
            setTimeout(() => {
                // setCreated(true)
            }, 10);
            // setCreated(false)
        },
        onError: (error) => {
            console.log({...error})
        }
    })


    function uuidFn() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    const [uuid, setUuid] = useState(uuidFn())
    const [int, setInt] = useState(2000)
    const [enable, setEnable] = useState(false)

    const tResponse = useQuery(['tResponse', {uuid}], getTRes, {
        refetchOnWindowFocus: false,
        refetchInterval: int,
        enabled: enable
    })

    const coursesT = useQuery('coursesT', getCoursesT, {
        refetchOnWindowFocus: false
    })

    const timetables = useQuery('timetables', getTimetables, {
        refetchOnWindowFocus: false
    })

    const roomsT = useQuery('roomsT', getRoomsT, {
        refetchOnWindowFocus: false
    })

    const {isLoading, data} = useQuery('lengths', getLength, {
        refetchOnWindowFocus: false
    })

    const [modalOut, setModalOut] = useState(false)
    const [updateOut, setUpdateOut] = useState(false)
    const [created, setCreated] = useState(false)
    const [showT, setShowT] = useState(false)
    const [showTimeDetails, setShowTimeDetails] = useState(false)



    const submit = (e) => {

        e.preventDefault()
        const datum = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);

        timetableFn({roomsT, coursesT, datum, uuid})

        setEnable(true)
        tResponse.refetch()
    }

    setInterval(()=> {
        if(tResponse.data?.data.data?.current_progress === 5000){
            setInt(-1)
        }
    }, 1000)

    const cProgress = tResponse.data?.data.data?.current_progress;
    const tProgress = tResponse.data?.data.data?.total_progress;
    const tDate = new Date(tResponse.data?.data.data?.updatedAt.substring(0,10)).toDateString();
    const tTime = tResponse.data?.data.data?.updatedAt.substring(11,16);

    var monday; var tuesday; var wednesday; var thursday; var friday;

    var mondayAll = [];

    const [monName, setMonName] = useState('')
    const [monVenue, setMonVenue] = useState('')

    const [monName2, setMonName2] = useState('')
    const [monVenue2, setMonVenue2] = useState('')

    const [monName3, setMonName3] = useState('')
    const [monVenue3, setMonVenue3] = useState('')

    const [monName4, setMonName4] = useState('')
    const [monVenue4, setMonVenue4] = useState('')


    var tuesdayAll = [];

    const [tueName, setTueName] = useState('')
    const [tueVenue, setTueVenue] = useState('')

    const [tueName2, setTueName2] = useState('')
    const [tueVenue2, setTueVenue2] = useState('')

    const [tueName3, setTueName3] = useState('')
    const [tueVenue3, setTueVenue3] = useState('')

    const [tueName4, setTueName4] = useState('')
    const [tueVenue4, setTueVenue4] = useState('')


    var wednesdayAll = [];

    const [wedName, setWedName] = useState('')
    const [wedVenue, setWedVenue] = useState('')

    const [wedName2, setWedName2] = useState('')
    const [wedVenue2, setWedVenue2] = useState('')

    const [wedName3, setWedName3] = useState('')
    const [wedVenue3, setWedVenue3] = useState('')

    const [wedName4, setWedName4] = useState('')
    const [wedVenue4, setWedVenue4] = useState('')


    var thursdayAll = [];

    const [thurName, setThurName] = useState('')
    const [thurVenue, setThurVenue] = useState('')

    const [thurName2, setThurName2] = useState('')
    const [thurVenue2, setThurVenue2] = useState('')

    const [thurName3, setThurName3] = useState('')
    const [thurVenue3, setThurVenue3] = useState('')

    const [thurName4, setThurName4] = useState('')
    const [thurVenue4, setThurVenue4] = useState('')


    var fridayAll = [];

    const [friName, setFriName] = useState('')
    const [friVenue, setFriVenue] = useState('')

    const [friName2, setFriName2] = useState('')
    const [friVenue2, setFriVenue2] = useState('')

    const [friName3, setFriName3] = useState('')
    const [friVenue3, setFriVenue3] = useState('')

    const [friName4, setFriName4] = useState('')
    const [friVenue4, setFriVenue4] = useState('')

    const arrangeT = () => {
        // eslint-disable-next-line no-unused-expressions

        monday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'monday'
        })

        var monday1 = [];  var monday2 = []; var monday3 = []; var monday4 = []

        monday1 = monday.filter((mon)=> {
            return mon.startHour === 9
        })

        monday2 = monday.filter((mon)=> {
            return mon.startHour === 11
        })

        monday3 = monday.filter((mon)=> {
            return mon.startHour === 13
        })

        monday4 = monday.filter((mon)=> {
            return mon.startHour === 15
        })

        mondayAll = [{
            monday1,
            monday2,
            monday3,
            monday4
        }]

        console.log(mondayAll)

        var myMonName;
        var myMonVenue;

        var myMonName2;
        var myMonVenue2;

        var myMonName3;
        var myMonVenue3;

        var myMonName4;
        var myMonVenue4;

        mondayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.monday1.length; i++){
                if (i > 0){
                    myMonName += '\n' + test.monday1[i].name;
                    myMonVenue += '\n' + test.monday1[i].venue;
                }else{
                    myMonName = test.monday1[i].name;
                    myMonVenue = test.monday1[i].venue;
                }
            }
            setMonName(myMonName)
            setMonVenue(myMonVenue)
        })

        mondayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.monday2.length; i++){
                if (i > 0){
                    myMonName2 += '\n' + test.monday2[i].name;
                    myMonVenue2 += '\n' + test.monday2[i].venue;
                }else{
                    myMonName2 = test.monday2[i].name;
                    myMonVenue2 = test.monday2[i].venue;
                }
            }
            setMonName2(myMonName2)
            setMonVenue2(myMonVenue2)
        })

        mondayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.monday3.length; i++){
                if (i > 0){
                    myMonName3 += '\n' + test.monday3[i].name;
                    myMonVenue3 += '\n' + test.monday3[i].venue;
                }else{
                    myMonName3 = test.monday3[i].name;
                    myMonVenue3 = test.monday3[i].venue;
                }
            }
            setMonName3(myMonName3)
            setMonVenue3(myMonVenue3)
        })

        mondayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.monday4.length; i++){
                if (i > 0){
                    myMonName4 += '\n' + test.monday4[i].name;
                    myMonVenue4 += '\n' + test.monday4[i].venue;
                }else{
                    myMonName4 = test.monday4[i].name;
                    myMonVenue4 = test.monday4[i].venue;
                }
            }
            setMonName4(myMonName4)
            setMonVenue4(myMonVenue4)
        })
    
        tuesday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'tuesday'
        })

        var tuesday1 = [];  var tuesday2 = []; var tuesday3 = []; var tuesday4 = []

        tuesday1 = tuesday.filter((tue)=> {
            return tue.startHour === 9
        })

        tuesday2 = tuesday.filter((tue)=> {
            return tue.startHour === 11
        })

        tuesday3 = tuesday.filter((tue)=> {
            return tue.startHour === 13
        })

        tuesday4 = tuesday.filter((tue)=> {
            return tue.startHour === 15
        })

        tuesdayAll = [{
            tuesday1,
            tuesday2,
            tuesday3,
            tuesday4
        }]

        console.log(tuesdayAll)

        var myTueName;
        var myTueVenue;

        var myTueName2;
        var myTueVenue2;

        var myTueName3;
        var myTueVenue3;

        var myTueName4;
        var myTueVenue4;

        tuesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.tuesday1.length; i++){
                if (i > 0){
                    myTueName += '\n' + test.tuesday1[i].name;
                    myTueVenue += '\n' + test.tuesday1[i].venue;
                }else{
                    myTueName = test.tuesday1[i].name;
                    myTueVenue = test.tuesday1[i].venue;
                }
            }
            setTueName(myTueName)
            setTueVenue(myTueVenue)
        })

        tuesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.tuesday2.length; i++){
                if (i > 0){
                    myTueName2 += '\n' + test.tuesday2[i].name;
                    myTueVenue2 += '\n' + test.tuesday2[i].venue;
                }else{
                    myTueName2 = test.tuesday2[i].name;
                    myTueVenue2 = test.tuesday2[i].venue;
                }
            }
            setTueName2(myTueName2)
            setTueVenue2(myTueVenue2)
        })

        tuesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.tuesday3.length; i++){
                if (i > 0){
                    myTueName3 += '\n' + test.tuesday3[i].name;
                    myTueVenue3 += '\n' + test.tuesday3[i].venue;
                }else{
                    myTueName3 = test.tuesday3[i].name;
                    myTueVenue3 = test.tuesday3[i].venue;
                }
            }
            setTueName3(myTueName3)
            setTueVenue3(myTueVenue3)
        })

        tuesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.tuesday4.length; i++){
                if (i > 0){
                    myTueName4 += '\n' + test.tuesday4[i].name;
                    myTueVenue4 += '\n' + test.tuesday4[i].venue;
                }else{
                    myTueName4 = test.tuesday4[i].name;
                    myTueVenue4 = test.tuesday4[i].venue;
                }
            }
            setTueName4(myTueName4)
            setTueVenue4(myTueVenue4)
        })




        wednesday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'wednesday'
        })

        var wednesday1 = [];  var wednesday2 = []; var wednesday3 = []; var wednesday4 = []

        wednesday1 = wednesday.filter((wed)=> {
            return wed.startHour === 9
        })

        wednesday2 = wednesday.filter((wed)=> {
            return wed.startHour === 11
        })

        wednesday3 = wednesday.filter((wed)=> {
            return wed.startHour === 13
        })

        wednesday4 = wednesday.filter((wed)=> {
            return wed.startHour === 15
        })

        wednesdayAll = [{
            wednesday1,
            wednesday2,
            wednesday3,
            wednesday4
        }]

        console.log(wednesdayAll)

        var myWedName;
        var myWedVenue;

        var myWedName2;
        var myWedVenue2;

        var myWedName3;
        var myWedVenue3;

        var myWedName4;
        var myWedVenue4;

        wednesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.wednesday1.length; i++){
                if (i > 0){
                    myWedName += '\n' + test.wednesday1[i].name;
                    myWedVenue += '\n' + test.wednesday1[i].venue;
                }else{
                    myWedName = test.wednesday1[i].name;
                    myWedVenue = test.wednesday1[i].venue;
                }
            }
            setWedName(myWedName)
            setWedVenue(myWedVenue)
        })

        wednesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.wednesday2.length; i++){
                if (i > 0){
                    myWedName2 += '\n' + test.wednesday2[i].name;
                    myWedVenue2 += '\n' + test.wednesday2[i].venue;
                }else{
                    myWedName2 = test.wednesday2[i].name;
                    myWedVenue2 = test.wednesday2[i].venue;
                }
            }
            setWedName2(myWedName2)
            setWedVenue2(myWedVenue2)
        })

        wednesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.wednesday3.length; i++){
                if (i > 0){
                    myWedName3 += '\n' + test.wednesday3[i].name;
                    myWedVenue3 += '\n' + test.wednesday3[i].venue;
                }else{
                    myWedName3 = test.wednesday3[i].name;
                    myWedVenue3 = test.wednesday3[i].venue;
                }
            }
            setWedName3(myWedName3)
            setWedVenue3(myWedVenue3)
        })

        wednesdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.wednesday4.length; i++){
                if (i > 0){
                    myWedName4 += '\n' + test.wednesday4[i].name;
                    myWedVenue4 += '\n' + test.wednesday4[i].venue;
                }else{
                    myWedName4 = test.wednesday4[i].name;
                    myWedVenue4 = test.wednesday4[i].venue;
                }
            }
            setWedName4(myWedName4)
            setWedVenue4(myWedVenue4)
        })



        thursday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'thursday'
        })

        var thursday1 = [];  var thursday2 = []; var thursday3 = []; var thursday4 = []

        thursday1 = thursday.filter((mon)=> {
            return mon.startHour === 9
        })

        thursday2 = thursday.filter((mon)=> {
            return mon.startHour === 11
        })

        thursday3 = thursday.filter((mon)=> {
            return mon.startHour === 13
        })

        thursday4 = thursday.filter((mon)=> {
            return mon.startHour === 15
        })

        thursdayAll = [{
            thursday1,
            thursday2,
            thursday3,
            thursday4
        }]

        console.log(thursdayAll)

        var myThurName;
        var myThurVenue;

        var myThurName2;
        var myThurVenue2;

        var myThurName3;
        var myThurVenue3;

        var myThurName4;
        var myThurVenue4;

        thursdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.thursday1.length; i++){
                if (i > 0){
                    myThurName += '\n' + test.thursday1[i].name;
                    myThurVenue += '\n' + test.thursday1[i].venue;
                }else{
                    myThurName = test.thursday1[i].name;
                    myThurVenue = test.thursday1[i].venue;
                }
            }
            setThurName(myThurName)
            setThurVenue(myThurVenue)
        })

        thursdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.thursday2.length; i++){
                if (i > 0){
                    myThurName2 += '\n' + test.thursday2[i].name;
                    myThurVenue2 += '\n' + test.thursday2[i].venue;
                }else{
                    myThurName2 = test.thursday2[i].name;
                    myThurVenue2 = test.thursday2[i].venue;
                }
            }
            setThurName2(myThurName2)
            setThurVenue2(myThurVenue2)
        })

        thursdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.thursday3.length; i++){
                if (i > 0){
                    myThurName3 += '\n' + test.thursday3[i].name;
                    myThurVenue3 += '\n' + test.thursday3[i].venue;
                }else{
                    myThurName3 = test.thursday3[i].name;
                    myThurVenue3 = test.thursday3[i].venue;
                }
            }
            setThurName3(myThurName3)
            setThurVenue3(myThurVenue3)
        })

        thursdayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.thursday4.length; i++){
                if (i > 0){
                    myThurName4 += '\n' + test.thursday4[i].name;
                    myThurVenue4 += '\n' + test.thursday4[i].venue;
                }else{
                    myThurName4 = test.thursday4[i].name;
                    myThurVenue4 = test.thursday4[i].venue;
                }
            }
            setThurName4(myThurName4)
            setThurVenue4(myThurVenue4)
        })



        friday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'friday'
        })

        var friday1 = [];  var friday2 = []; var friday3 = []; var friday4 = []

        friday1 = friday.filter((fri)=> {
            return fri.startHour === 9
        })

        friday2 = friday.filter((fri)=> {
            return fri.startHour === 11
        })

        friday3 = friday.filter((fri)=> {
            return fri.startHour === 13
        })

        friday4 = monday.filter((fri)=> {
            return fri.startHour === 15
        })

        fridayAll = [{
            friday1,
            friday2,
            friday3,
            friday4
        }]

        console.log(fridayAll)

        var myFriName;
        var myFriVenue;

        var myFriName2;
        var myFriVenue2;

        var myFriName3;
        var myFriVenue3;

        var myFriName4;
        var myFriVenue4;

        fridayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.friday1.length; i++){
                if (i > 0){
                    myFriName += '\n' + test.friday1[i].name;
                    myFriVenue += '\n' + test.friday1[i].venue;
                }else{
                    myFriName = test.friday1[i].name;
                    myFriVenue = test.friday1[i].venue;
                }
            }
            setFriName(myFriName)
            setFriVenue(myFriVenue)
        })

        fridayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.friday2.length; i++){
                if (i > 0){
                    myFriName2 += '\n' + test.friday2[i].name;
                    myFriVenue2 += '\n' + test.friday2[i].venue;
                }else{
                    myFriName2 = test.friday2[i].name;
                    myFriVenue2 = test.friday2[i].venue;
                }
            }
            setFriName2(myFriName2)
            setFriVenue2(myFriVenue2)
        })

        fridayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.friday3.length; i++){
                if (i > 0){
                    myFriName3 += '\n' + test.friday3[i].name;
                    myFriVenue3 += '\n' + test.friday3[i].venue;
                }else{
                    myFriName3 = test.friday3[i].name;
                    myFriVenue3 = test.friday3[i].venue;
                }
            }
            setFriName3(myFriName3)
            setFriVenue3(myFriVenue3)
        })

        fridayAll.map((test)=> {
            console.log(test)
            for(let i=0; i<test.friday4.length; i++){
                if (i > 0){
                    myFriName4 += '\n' + test.friday4[i].name;
                    myFriVenue4 += '\n' + test.friday4[i].venue;
                }else{
                    myFriName4 = test.friday4[i].name;
                    myFriVenue4 = test.friday4[i].venue;
                }
            }
            setFriName4(myFriName4)
            setFriVenue4(myFriVenue4)
        })
    }

    

    // const test = () => {

    //     var myString;
    //     var myString2;

    //     [{
    //         monday: [
    //             {name: 'a',value: 2},
    //             {name: 'b', value: 3},
    //             {name: 'hello', value: 4}
    //         ],
    //         monday2: [
    //             {name: 'c'}
    //         ]
    //     }].map((test)=> {
    //         console.log(test)
    //         for(let i=0; i<test.monday.length; i++){
    //             if (i > 0){
    //                 myString += '\n' + test.monday[i].name;
    //                 myString2 += '\n' + test.monday[i].value;
    //             }else{
    //                 myString = test.monday[i].name;
    //                 myString2 = test.monday[i].value;
    //             }
    //         }
    //         console.log(myString)
    //         console.log(myString2)
    //         setString(myString)
    //         setString2(myString2)
    //     })
    // }

    return(
        <>  
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo" />
                    <p>Dashboard</p>
                  </div>
                  <div className="navMobile">
                    <div className="update" 
                    onClick={()=>{
                        setUpdateOut(!updateOut);
                    }}></div>
                    <Link to="/app/notification">
                        <div className="bell"></div>
                    </Link>
                  </div>
              </header>
             {isLoading === false ? 
                <div className="card-container"> 
                    {showT === false ? 
                    <>     
                    <CSSTransition
                            timeout={10}
                            className="cardani"
                            in={true}
                            appear={true}
                            key="e"
                            onEntered={()=> {
                                document.querySelector(".cardani").classList.add("cardani2")
                                }}>
                            <Link to="/app/rooms">
                                <div className="card card-room">
                                    <h3>Lecture Rooms</h3>
                                    <p>{data.rooms}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardania"
                            in={true}
                            appear={true}
                            key="a"
                            onEntered={()=> {
                                document.querySelector(".cardania").classList.add("cardania2")
                                }}>
                            <Link to="/app/courses">
                                <div className="card card-course">
                                    <h3>Courses</h3>
                                    <p>{data.courses}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanib"
                            in={true}
                            appear={true}
                            key="b"
                            onEntered={()=> {
                                document.querySelector(".cardanib").classList.add("cardanib2")
                                }}>
                            <Link to="/app/lecturers">
                                <div className="card card-lect">
                                    <h3>Lecturers</h3>
                                    <p>{data.lecturers}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanic"
                            in={true}
                            appear={true}
                            key="c"
                            onEntered={()=> {
                                document.querySelector(".cardanic").classList.add("cardanic2")
                                }}>
                            <Link to="/app/classes">
                                <div className="card card-class">
                                    <h3>Classes</h3>
                                    <p>{data.classess}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanid"
                            in={true}
                            appear={true}
                            key="d"
                            onEntered={()=> {
                                document.querySelector(".cardanid").classList.add("cardanid2")
                                }}>
                            <Link to='/app/student'>
                                <div className="card card-stud">
                                    <h3>Students</h3>
                                    <p>{data.students}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanie"
                            in={true}
                            appear={true}
                            key="evvd"
                            onEntered={()=> {
                                document.querySelector(".cardanie").classList.add("cardanie2")
                                }}>
                            <Link to='/app/events'>
                                <div className="card card-event">
                                    <h3>Events</h3>
                                    <p>{data.events}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    </>
                    : null}
            </div>
                : <div className="spinnerContainer"><img src={spinner} alt="loading.."/></div>}

            { created === false ? <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p>Timetable update</p>

                <hr />

                {timetables.data?.data.data.length > 0 ? <p>Timetables available</p> : <p>Timetables unavailable for now</p>}
                <div className="timetables-container">
                {
                    timetables.data?.data.data.map((tt)=> {
                        return (
                            <div key={tt._id}>
                                <p className="timetables" onClick={()=> setShowTimeDetails(!showTimeDetails)}>{tt.name}<img src={arrowD} alt="arrow"/></p>
                                {showTimeDetails === true ? <div>
                                    <em>{new Date(tt.updatedAt.substring(0,10)).toDateString()} - {tt.updatedAt.substring(11,16)}</em>
                                </div> : null}
                            </div>
                        );
                    })
                }
                </div>
                <button onClick={()=>{
                        setModalOut(!modalOut);
                        // test()
                        // setShowT(true)
                    }}>Create new timetable now</button>
            </div> : null}

            {created === true ? <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p className="mb-30">Timetable update</p>

                <hr />

                <p className="mb-20">Timetable available</p>

                <em className="mb-30">{cProgress === 5000 ? <span>{tResponse.data?.data.data?.name}</span> : <span>Loading...</span>}</em>

                <div className="timetable-stats">
                    <p>Status</p>
                    {cProgress === 5000 ? <p>Complete</p> : <progress value={!tResponse.data.data.error && cProgress  ? (cProgress/tProgress) * 100 : 0} max="100"/>}
                </div>

                <div className="timetable-stats mb-30">
                    <p>Time</p>
                    <p>{cProgress === 5000 ? <span>{tDate} - {tTime}</span> : <span>Loading...</span>}</p>
                </div>

                <button onClick={()=> arrangeT()}>Print Timetable</button>
                <button onClick={()=> {
                    arrangeT()
                    setShowT(true)
                }
                }>View More</button>
            </div> : null}

            {/* <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p className="mb-30">Timetable update</p>

                <hr />

                <p className="mb-20">Timetable available</p>

                <em className="mb-20">Timetable available for 200 level management sciences</em>
                <em className="mb-30">Timetable available for 300 level management sciences</em>

                <div className="timetable-stats">
                    <p>Created</p>
                    <p>June 12th 2018 at 11:59PM</p>
                </div>

                <button className="mb-20">Submit</button>
                <Link to="/app/timetable">View More</Link>
            </div> */}

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                        setModalOut(!modalOut);
                    }}></div>

                <div className={modalOut === true ? "modal dashModal modOut" : " dashModal modal"}>
                    <div className="head">
                        <h3>Add new timetable</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form onSubmit={submit}>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Timetable Name</p>
                            <input name="name" className="name"/>
                        </div>
                        <div className="input-g">
                            <p>Select Academic Period</p>
                            <input name="aca-period" className="aca-period" placeholder="Select an academic period"/>
                        </div>
                        <div className="input-g">
                            <p>Select days</p>
                            <div className="labels">
                                <label className="container">Monday
                                    <input type="checkbox" value="monday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Tuesday
                                    <input type="checkbox" value="tuesday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Wednesday
                                    <input type="checkbox" value="wednesday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Thursday
                                    <input type="checkbox" value="thursday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">Friday
                                    <input type="checkbox" value="friday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">Saturday
                                    <input type="checkbox" value="saturday" />
                                    <span className="checkmark"></span>
                                </label>
                            <div />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=>{
                        setModalOut(!modalOut);
                    }}>Cancel</button>
                        <button className="blue CTBtn" type="submit">
                        {status === "loading" ? <span>Loading...</span> : <span>Create timetable</span>}
                        </button>
                    </div>
                </div>
                </form>
            </div>

            { showT === true ? <div className="timetable">

                <div className="note">
                    <p>Lr - Lecture room</p>
                    <p>Lt - Lecture theatre</p>
                    <p>Lh - Lecture hall</p>
                </div>

                <div className="tDetails">
                    <p>Name : Timetable for 200L</p>
                    <p>Academic Session : 2020/2021</p>
                </div>

                
                <div className="table-container">
                        <table className="table table2">
                        <thead className="table-head">
                            <tr className="row1">
                            <th></th>
                            <th>9:00-11:00</th>
                            <th>11:00-13:00</th>
                            <th>13:00-15:00</th>
                            <th>15:00-17:00</th>
                            </tr>
                        </thead>
                        <tbody className="gfg">
                                    <tr className="default default2">
                                        <td>Monday</td>
                                        <td>{monName} <br /> <em>{monVenue}</em></td>
                                        <td>{monName2} <br /> <em>{monVenue2}</em></td>
                                        <td>{monName3} <br /> <em>{monVenue3}</em></td>
                                        <td>{monName4} <br /> <em>{monVenue4}</em></td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Tuesday</td>
                                        <td>{tueName} <br /> <em>{tueVenue}</em></td>
                                        <td>{tueName2} <br /> <em>{tueVenue2}</em></td>
                                        <td>{tueName3} <br /> <em>{tueVenue3}</em></td>
                                        <td>{tueName4} <br /> <em>{tueVenue4}</em></td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Wednesday</td>
                                        <td>{wedName} <br /> <em>{wedVenue}</em></td>
                                        <td>{wedName2} <br /> <em>{wedVenue2}</em></td>
                                        <td>{wedName3} <br /> <em>{wedVenue3}</em></td>
                                        <td>{wedName4} <br /> <em>{wedVenue4}</em></td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Thursday</td>
                                        <td>{thurName} <br /> <em>{thurVenue}</em></td>
                                        <td>{thurName2} <br /> <em>{thurVenue2}</em></td>
                                        <td>{thurName3} <br /> <em>{thurVenue3}</em></td>
                                        <td>{thurName4} <br /> <em>{thurVenue4}</em></td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Friday</td>
                                        <td>{friName} <br /> <em>{friVenue}</em></td>
                                        <td>{friName2} <br /> <em>{friVenue2}</em></td>
                                        <td>{friName3} <br /> <em>{friVenue3}</em></td>
                                        <td>{friName4} <br /> <em>{friVenue4}</em></td>
                                    </tr>
                        </tbody>
                        </table>
                    </div>
                </div> : null}
        </>
    );
}

export default Dashboard;