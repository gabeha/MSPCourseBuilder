const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search courses.json and filter it
const searchCourses = async searchText => {
    const res = await fetch('courses.json');
    const courses = await res.json();

    console.log(courses);

    // get matches to current text input
    let matches = courses.filter(course => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return course.name.match(regex) 
        || course.course_id.match(regex) 
        || course.area.match(regex) 
        || course.time.match(regex) 
        || course.level.match(regex) 
        || course.type.match(regex);
    });

if(searchText.length ===0){
    matches = [];
    //the code below clears the html, since the above only clears the array
    matchList.innerHTML = '';
}

    console.log(matches);

outputHtml(matches);
};
// show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        //map returns array from an array
        const html = matches.map(match => `<div class="mb-1 hover:bg-gray-300 rounded-md text-left p-2 ">
        <h4>${match.name} (${match.course_id}) <span class ="text-primary">${match.level}</span>
        </h4>
        <small>
        Time: ${match.time} / Type: ${match.type} 
        </small>
        </div>
        `).join('');
        console.log(html);

        matchList.innerHTML = html;
    }
};
search.addEventListener('input', () => searchCourses(search.value));
