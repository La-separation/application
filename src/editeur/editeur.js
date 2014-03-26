var Editeur = new Object();
var available_editions = ["classic"]

var recherche = null;
var ask_to_scroll_up = 0;
var ask_to_scroll_down = 0;

Editeur.start = function() {
	Editeur.displayMenu();
}

//Affiche le menu de choix des types de récits
//TODO - Pour l'instant, on bypass
Editeur.displayMenu = function() {
	Destroy.all();
	Editeur.displayEdition(available_editions[0]);
}

Editeur.displayEdition = function(type) {
	console.log('Ouverture d\'edition '+type);
	Destroy.all();
	gui.Editeur_displayAll();
	Editeur[type+'_display']();
}

Editeur.textInputTitle = function(x, y, z) {
	var lm = this;
	CocoonJS.App.onTextDialogFinished.addEventListener(function(text){
		if (text != "" && text != null) {
			Destroy.objet(lm.title);
			lm.title = new Word(text);
			lm.title.setCenterX(x);
			lm.title.setCenterY(y);
			lm.title.setZoom(z);
			lm.title.display();
		} else {
			lm.textInputTitle();
		}
	});
	CocoonJS.App.showTextDialog("", "Tapez votre titre :", "");
}

Editeur.scrollUp = function() {
	if(!recherche.inTransform) {
		if(!recherche.inAnimation)
			recherche.scrollUp();
		else
			ask_to_scroll_up++;
	}
}
Editeur.scrollDown = function() {
	if(!recherche.inTransform) {
		if(!recherche.inAnimation)
			recherche.scrollDown();
		else
			ask_to_scroll_down++;
	}
}

Editeur.scrollFinish = function() {
	// On annule les évènements contraires
	while(ask_to_scroll_up > 0 && ask_to_scroll_down > 0) { ask_to_scroll_up--; ask_to_scroll_down--; }
	
	if(ask_to_scroll_up > 0) {
		ask_to_scroll_up--;
		Editeur.scrollUp();
	}
	else if(ask_to_scroll_down > 0) {
		ask_to_scroll_down--;
		Editeur.scrollDown();
	}
}
scriptLoaded('src/editeur/editeur.js');
