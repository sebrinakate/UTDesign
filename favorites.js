const student = await db.Student.findOne(ObjectID(studentID));
const tutor = await db.Tutor.find(query).toArray();

for(let numFav of tutor){
    if(student.favorites[numFav.tutorID])
        // display list of favorited tutors
}