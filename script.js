window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        100
    )
});

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

// scroll bar
const scrollProgressElement = document.querySelector("#scroll-progress");

function scrollProgress() {
    console.log("Hi");
    const totalheightOfWebPage = document.body.scrollHeight;
    const currentDistanceFromTop = document.documentElement.scrollTop;

    const windowHeight = document.documentElement.clientHeight;

    const scrolledPercentage = 
    (currentDistanceFromTop / (totalheightOfWebPage - windowHeight)) * 100;

    // console.log(Math.round(scrolledPercentage));

    scrollProgressElement.style.width = Math.round(scrolledPercentage) + "%";
}


document.addEventListener("scroll", scrollProgress);

