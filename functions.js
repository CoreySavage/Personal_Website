function openContainer(id) {
  document.getElementById(id).className = "";
}

function closeContainer() {
  if (document.getElementById("image_viewer").className !== "hidden") {
    console.log('A');
    document.getElementById("image_viewer").className = "hidden";
  }
  else if (document.getElementById("project_nav").className == "hidden") {
    console.log('B');
    document.getElementById("project_nav").className = "flexbox_container";
    document.getElementById("image_slider").className = "hidden";
    document.getElementById("lse_content").className = "hidden";
    document.getElementById("brown_wedding_content").className = "hidden";
    document.getElementById("personal_site_content").className = "hidden";
    document.getElementById("brown_comedy_content").className = "hidden";
  }
  else {
    console.log('C');
    document.getElementById("projects_container").className = "hidden";
    document.getElementById("about_container").className = "hidden";
    document.getElementById("contact_container").className = "hidden";
  }
}

function projects_content_toggle(id) {
  document.getElementById("project_nav").className = "hidden";
  if (document.getElementById(id).className == "hidden") {
    document.getElementById("lse_content").className = "hidden";
    document.getElementById("brown_wedding_content").className = "hidden";
    document.getElementById("personal_site_content").className = "hidden";
    document.getElementById("brown_comedy_content").className = "hidden";
    document.getElementById(id).className = " ";
    document.getElementById("image_slider").className = "";
    if (id == "lse_content") {
      for (let value of document.getElementsByClassName("slide")) {
        value.style.backgroundImage = "url(img/lse/lse_landing.png)";
        value.style.backgroundImage = "url(img/lse/lse_landing.png)"; 
        value.style.backgroundImage = "url(img/lse/lse_landing.png)"; 
        value.style.backgroundImage = "url(img/lse/lse_landing.png)";  
      }
    }
    else if (id == "brown_wedding_content") {
      document.getElementById("slide1").style.backgroundImage = "url(img/brown_wedding/brown_wedding_landing.png)";
      document.getElementById("slide2").style.backgroundImage = "url(img/brown_wedding/brown_wedding_story.png)";
      document.getElementById("slide3").style.backgroundImage = "url(img/brown_wedding/brown_wedding_details.png)";
      document.getElementById("slide4").style.backgroundImage = "url(img/brown_wedding/brown_wedding_photos.png)";
    }
    else if (id == "personal_site_content") {
      document.getElementById("slide1").style.backgroundImage = "url(img/personal_site/personal_site_landing.png)";
      document.getElementById("slide2").style.backgroundImage = "url(img/personal_site/personal_site_about.png)";
      document.getElementById("slide3").style.backgroundImage = "url(img/personal_site/personal_site_projects.png)";
      document.getElementById("slide4").style.backgroundImage = "url(img/personal_site/personal_site_contact.png)";
    }
    else {
      document.getElementById("slide1").style.backgroundImage = "url(img/brown_comedy/brown_comedy_landing.png)";
      document.getElementById("slide2").style.backgroundImage = "url(img/brown_comedy/brown_comedy_shows.png)";
      document.getElementById("slide3").style.backgroundImage = "url(img/brown_comedy/brown_comedy_videos.png)";
      document.getElementById("slide4").style.backgroundImage = "url(img/brown_comedy/brown_comedy_pictures.png)";
    }
  }
}







function thumbnailHover(x) {
  x.style.backgroundColor = "rgba(0,0,0,100)";
}

$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;


  $slides.each(function() {
    $(this).on('click', function() {
      clearTimeout(timeout);
      var $currentImage = $(this).css("background-image");
      var imgUrl = $currentImage.match(/(img.*?png)/);
      $('.img_source').attr("src", imgUrl[0]);
      $('#image_viewer').removeClass('hidden');
    });
  });
  
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    advance();
    
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 6000);
  }
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === 0) {
      $button.addClass('active');
    }

    $button.on('click', function() {
      move(index);
      clearTimeout(timeout);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });

  $('.project_thumb').on('click', function() {
    move(0);
  });

  $('.close_bttn').on('click', function() {
    if ($('#projects_container').attr('class') == "") {
      move(currentIndex);
    }
  });
  
  advance();
});


