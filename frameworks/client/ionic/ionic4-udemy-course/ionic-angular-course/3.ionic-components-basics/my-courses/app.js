const courseName = document.querySelector('#course-name');
const courseRating = document.querySelector('#course-rating');
const addButton = document.querySelector('#add-button');
const totalCourses = document.querySelector('#total-courses');
const courseList = document.querySelector('#course-list');

const clear = () => {
  courseName.value = '';
  courseRating.value = '';
}

let totalCoursesNumber = 0;

addButton.addEventListener('click', () => {
  const courseNameVal = courseName.value;
  const courseRatingVal = courseRating.value;

  if(courseNameVal && courseRatingVal) {

    let item = document.createElement('ion-item');
    item.innerHTML = `<strong>${courseNameVal}</strong>: ${courseRatingVal}`;
    totalCoursesNumber += 1;
    totalCourses.textContent = totalCoursesNumber;
    courseList.appendChild(item);

    clear();

  } else {
    const alertController = document.querySelector('ion-alert-controller');
  
    alertController.create({
      header: 'Error',
      subHeader: 'Please fix missing fields',
      message: 'Course name and rating are both required',
      buttons: ['OK']
    }).then((alert) => {
      alert.present()
    })
  }

  console.log(courseNameVal, courseRatingVal)
});
