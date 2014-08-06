var mbAlbum = 'Funkadelic - Maggot Brain (1971)';
var mbSongs = ['1 - Maggot Brain', '2 - Can You Get to That', '3 - Hit it and Quit it', '4 - You and Your Folks, Me and My Folks', '5 - Super Stupid', '6 - Back in Our Minds', '7 - Wars of Armageddon', 'Never Gonna Give You Up'];
var currTrack = 0; 
var maxTrack = 6;
var myMusic=document.getElementById("musicToPlay");

function play_music() {
	if (myMusic.paused) {
		myMusic.play();
		document.getElementById("musicPause").style.opacity = 1;
		document.getElementById("musicPlay").style.opacity = 0;
	} else {
		myMusic.pause();
		document.getElementById("musicPause").style.opacity = 0;
		document.getElementById("musicPlay").style.opacity = 1;
	}
};

function next_track() {
	if (currTrack < maxTrack) {
		currTrack ++;
	} else {
		currTrack = 0;
	}
	myMusic.src = mbAlbum + '/' + mbSongs[currTrack] + '.mp3';
	document.getElementById("songTitleSwitch").innerHTML = mbSongs[currTrack];
	play_music();
};

function prev_track() {
	if (currTrack < maxTrack) {
		currTrack --;
	} else {
		currTrack = maxTrack;
	}
	myMusic.src = mbAlbum + '/' + mbSongs[currTrack] + '.mp3';
	document.getElementById("songTitleSwitch").innerHTML = mbSongs[currTrack];
	play_music();
};

function play_rick (pass) {
	if (pass == 'play') {
		myMusic.src = mbAlbum + '/' + mbSongs[7] + '.mp3';
		myMusic.play();
	} else {
		myMusic.pause();
	}
};