/* jQuery(document).ready(function() {
    let activeTab = $("#overview-tab a").filter(".active");
    
    $("#overview-tab a").click(function(e) {
        e.preventDefault();

        activeTab.removeClass('active');
        $(activeTab.attr('href')).removeClass('active');

        activeTab = $(this);

        activeTab.addClass("active");
        $(activeTab.attr('href')).addClass("active");
    })
}) */

/* $(document).ready( function() {
    $('#overview-tab').carousel({
        interval:   4000
    });

    var clickEvent = false;
    $('#myCarousel').on('click', '.nav a', function() {
            clickEvent = true;
            $('.nav li').removeClass('active');
            $(this).parent().addClass('active');        
    }).on('slid.bs.carousel', function(e) {
        if(!clickEvent) {
            var count = $('.nav li').length -1;
            var current = $('.nav li.active');
            current.removeClass('active').next().addClass('active');
            var id = parseInt(current.data('slide-to')) +1;
            if(count+1 == id) {
                $('.nav li').first().addClass('active');    
            }
        }
        clickEvent = false;
    });
}); */

$("#overview").ready(function () {

    const users = db.collection("users");

    firebase.auth().onAuthStateChanged((user) => {
        users
        .doc(user.uid)
        .get()
        .then(function(doc) {
            let worst = doc.data().worstCategory;
            let name = doc.data().name;
            
            $("#your-worst-cat").append(worst);
            $("#user-name").append(name);
            $("#user-name2").append(name);

            genIncentiveByWorstCat(worst);
        })
    })
})

function genIncentiveByWorstCat(category) {
    console.log(category);
    const incentives = db.collection("incentives");

    incentives
    .where("type", "==", category)
    .limit(1)
    .get()
    .then(function (snap) {
        snap.forEach(function (doc) {
            var desc = doc.data().desc;
            var org = doc.data().org;
            var linkURL = doc.data().url;
            var image = doc.data().image;
            console.log(desc + ", " + org + ", " + linkURL);
            console.log(image);

            
            $("#incentive-card-title").append(org);
            $(".card-text").append(desc);
            $("#type-picture").attr("src", ("../img/" + image));
            $("#incentive_url").attr("href", linkURL);
        })
    })
}