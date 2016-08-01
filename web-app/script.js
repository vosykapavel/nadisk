
//Pavel
    var baseUrl = "http://nadisk.cz/";
    var navStatus = 'navStatus';
    var navService = 'navService';
    var navName = 'navName';
    var navHref = 'navHref';
    var navClose = 'navClose';
    var navData = 'navData';
    var navNick = 'navNick';
    var navInput = 'navInput';
    var navLogin = 'navLogin';
    var navPassword = 'navPassword';
	var navAlbum = 'navAlbum';
    var navAlbums = 'navAlbums';
    var navId = 'navId';
    var navColor = 'navColor';
    var navImages = 'navImages';
    var navZmena = 'navZmena';
    var navIntervalJson = 'navIntervalJson';
    var navInterval = 'navInterval';
    var navVolno = 'navVolno';
    var navInstagramLastId = 'navInstagramLastId';
    var navCelkem = 'navCelkem';
    var navZip = 'navZip';
    var odd = 'oddelovac';
    var tabActual = 0;
    var tabNext = 0;
    var ocClose = false; // zavírání pro onclick 
    var iISmall = 'iISmall';//instgramImagesSmall
    var iIBig = 'iIBig';//instgramImagesBig
    var iIdownloaded = 'iIdownloaded';//instgramImagesDownloaded
    var downStatusTrue = 'downloaded';
    var downStatusFalse = 'undownloaded';
    var showingLimit = 40;
    var toDownload = 'iToDownload';
    var homepage;
    var navAlbumName;
	
	var RErajce = new RegExp(".rajce(.*)/(.*)");
	var REwww = new RegExp("www.(.*).rajce.");
	var REhttp = new RegExp("http://(.*).rajce.");
	var REnone = new RegExp("(.*).rajce.");
    
    var tabs = [];
    tabs.push ({
        navName :"Opendown",
        navHref :"home",
        navClose: false,
        navData : 'Vyberte službu. <input type="button" value="Instagram" onclick="instagramNew();">',
        navStatus  : 1,
        navZmena: true
    });
    var sInstagram = 'instagram';
	var sRajce = 'rajce';
                
    function stopTab(tab){
        switch(tabs[tab][navService]){
            case(sInstagram): 
                switch(tabs[tab][navStatus]){
                case(1):
                //instagramNickChecking(false); //zastavení kontroly nicku
                console.log('interval zastaven');
                break;
                default:
                    //alert("status"+tabs[tab][navStatus]);
                break;
                }
            break;
        }
        
    
    }
    function drawTab(tab, callback){//vykreslování pravé části
        console.log('Vykresluji tab cislo '+tab+' z '+tabActual+(tab===tabActual?'stejný':'jiný')+' '+tabs[tab][navZmena]);
        callback = typeof callback !== 'undefined' ? callback : prazdnyCB;
        if(ocClose){//kliklo se na přitom i na zavírání?
            stopTab(tab);//zastavit procesy zavíraného tabu (jenom pauznutí mělo by se to řešit v closeTab, protože něktré procesy se nepauzutí ale beží i při přepnutí dál na pozadí... až při zavření by se měli zastavait všechny
            ocClose=false; //potvrzení zavírání  tabu
        }else{//když se přepíná
            if(tabActual !== tab || tabs[tab][navZmena] === true){
                tabs[tab][navZmena]=false;
				tabNext = tab;
                var data = ''; //temp pro vykreslení
				var ovladani ='';
                var lista = '';
                if($('nav').hasClass('zeroHeight')){
                    $('nav').removeClass('zeroHeight');                                
                }
                switch(tabs[tab][navService]){//typ co vykreslit podle druhu služby
                    case(sInstagram): //Jak vykreslovat Instagram ve stavech:
                        if(!($('header').hasClass('iHeader'))){
                                $('header').addClass('iHeader');                                
                        }
                        var celkem =tabs[tab][navCelkem];
						var nick = tabs[tab][navNick];
                        var nacteno = tabs[tab][navImages][iISmall].length;
						var stazeno = tabs[tab][navImages][iIdownloaded].length;
                        switch(tabs[tab][navStatus]){
                            case(0)://vytvaření - prakticky neviditelný stav
                            break;
                            case(1): //zadávání nicku
								data ='<p>Zadejte přezdívku (nebo odkaz - zatím nefunguje) a stáhněte si všechny fotky z instagramu.</p><div class="start"><input id="i1nick" type="text" name="nick" class="iNick nick" placeholder="Zadejte instagram přezdívku" '+((nick)?'value="'+nick+'"':'')+ '><input id="i1next" type="button" name="next" class="iNext next" value="Pokračovat" onclick="nextStep('+tab+');"></div><script>document.getElementById("i1nick").onkeypress=function(e){if(e.keyCode==13){document.getElementById("i1next").click();}};document.getElementById("i1nick").focus();</script>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Instagram</span></span></div>';
                            break;
                            case(2): //načítání json dat
                                var nacteno = tabs[tab][navImages][iISmall].length;
								var stav = tabs[tab][navStatus];
								
								ovladani='<div id="ovladani"><div id="status">2</div><div id="info">'+nick+' >> Načítání obrázků.. </div><div id="pokrok">'+nacteno+' obrázků</div></div>';
                                data='<div class="proces"><table class="info iInfo"><tr><th>Fotky:</th><td>?</td></tr><tr><th>Videa:?</th><td>?</td></tr><tr><th>Načteno:</th><td>'+nacteno+'/?</td></tr><tr><th>Staženo:</th><td>0/?</td></tr><tr><th>Stav:</th><td>načítání</td></tr></table><div class="percent iPercent">??%</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="click">Instagram</span> > <span class="noclick">'+nick+'</span></span></div>';

                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                                for(var img = 0;(img<showingLimit&&img<celkem);img++){
                                    data += '<a class="instagramOdkaz"><img src="'+tabs[tab][navImages][iISmall][img]+'" class="instagramObrazek"></a>';
                                }
                                data+='</div>';
                            break;
                            case(3): //načteny všechny obrázky - možnost stáhnout vše
    							var nacteno = tabs[tab][navImages][iISmall].length;
								var stav = tabs[tab][navStatus];
								ovladani = '<div id="ovladani"><div id="status">3</div><div id="info">'+nick+' >> obrázky načteny ('+nacteno+') </div><div id="pokrok"><input type="button" value="Stáhnout vše" onclick="nextStep('+tab+')"></div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="click">Instagram</span> > <span class="noclick">'+nick+'</span></span></div>';
                                data='<div class="proces"><table class="info iInfo"><tr><th>Fotky:</th><td>'+nacteno+'</td></tr><tr><th>Videa:</th><td>'+nacteno+' (?)</td></tr><tr><th>Načteno:</th><td>'+nacteno+'/'+nacteno+'</td></tr><tr><th>Staženo:</th><td>0/'+nacteno+'</td></tr><tr><th>Stav:</th><td>načteno</td></tr></table><div class="percent iPercent">??%</div></div>';

                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                                for(var img = 0;(img<showingLimit&&img<celkem);img++){
                                    data += '<a class="instagramOdkaz"><img src="'+tabs[tab][navImages][iISmall][img]+'" class="instagramObrazek"></a>';
                                }
                                data+='</div>';
                            break;
                            case(4)://stahování na server
								var stazeno = tabs[tab][navImages][iIdownloaded].length;
								var procento = Math.ceil(stazeno/(celkem/100));
								ovladani = '<div id="ovladani"><div id="status">4</div><div id="info">'+nick+' >> stahování na server.. ('+stazeno+' z '+celkem+') </div><div id="pokrok" style="border-right:'+(200-procento*2)+'px solid lightgrey;width:'+procento*2+'px;">'+procento+'%</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="click">Instagram</span> > <span class="noclick">'+nick+'</span></span></div>';
                                data='<div class="proces"><table class="info iInfo"><tr><th>Fotky:</th><td>'+nacteno+'</td></tr><tr><th>Videa:</th><td>'+nacteno+' (?)</td></tr><tr><th>Načteno:</th><td>'+nacteno+'/'+nacteno+'</td></tr><tr><th>Staženo:</th><td>'+stazeno+'/'+nacteno+'</td></tr><tr><th>Stav:</th><td>stahování na server</td></tr></table><div class="percent iPercent">'+procento+'%</div></div>';

                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                                for(var img = 0;(img<showingLimit&&img<celkem);img++){
                                    data += '<a class="instagramOdkaz"><img src="'+tabs[tab][navImages][iISmall][img]+'" class="instagramObrazek"></a>';
                                }
                                data+='</div>';
                            break;
                            case(5)://zipování
                                ovladani = '<div id="ovladani"><div id="status">5</div><div id="info">'+nick+' >> zipování.. ('+celkem+') </div><div id="pokrok">Chvilinku..</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="click">Instagram</span> > <span class="noclick">'+nick+'</span></span></div>';
                                data='<div class="proces"><table class="info iInfo"><tr><th>Fotky:</th><td>'+nacteno+'</td></tr><tr><th>Videa:</th><td>'+nacteno+' (?)</td></tr><tr><th>Načteno:</th><td>'+nacteno+'/'+nacteno+'</td></tr><tr><th>Staženo:</th><td>'+stazeno+'/'+nacteno+'</td></tr><tr><th>Stav:</th><td>zipování</td></tr></table><div class="percent iPercent">99%</div></div>';

                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                                for(var img = 0;(img<showingLimit&&img<celkem);img++){
                                    data += '<a class="instagramOdkaz"><img src="'+tabs[tab][navImages][iISmall][img]+'" class="instagramObrazek"></a>';
                                }
                                data+='</div>';
                            break;
                            case(6)://zip ke stažení
								var zip = tabs[tab][navZip];
                                
                                ovladani = '<div id="ovladani"><div id="status">6</div><div id="info">'+nick+' >> zipování dokončeno ('+celkem+') </div><div id="pokrok"><a href="'+zip+'" download>Stáhnout zip</a></div></div>';
								//ovladani = 'Stáhněte si zip:<a href="'+zip+'">'+zip+'</a>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="click">Instagram</span> > <span class="noclick">'+nick+'</span></span></div>';
                                data='<div class="proces"><table class="info iInfo"><tr><th>Fotky:</th><td>'+nacteno+'</td></tr><tr><th>Videa:</th><td>'+nacteno+' (?)</td></tr><tr><th>Načteno:</th><td>'+nacteno+'/'+nacteno+'</td></tr><tr><th>Staženo:</th><td>'+stazeno+'/'+nacteno+'</td></tr><tr><th>Stav:</th><td>hotovo</td></tr></table><div class="percent iPercent"><a href="'+zip+'">Link</a></div></div>';

                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                                for(var img = 0;(img<showingLimit&&img<celkem);img++){
                                    data += '<a class="instagramOdkaz"><img src="'+tabs[tab][navImages][iISmall][img]+'" class="instagramObrazek"></a>';
                                }
                                data+='</div>';
                            break;
                            default:
                                alert("Jsem z instagramu, jenže můj status je: "+tabs[tab][navStatus]);
                            break;
                        }
                    break;
					case(sRajce)://Pro stahování z rajčete
					//var celkem =tabs[tab][navCelkem];
                    if(!($('header').hasClass('rHeader'))){
                            $('header').addClass('rHeader');                                
                    }
					var nick = tabs[tab][navNick];
					var input = tabs[tab][navInput];
                    var celkem = tabs[tab][navCelkem];
                        switch(tabs[tab][navStatus]){
                            case(0)://vytvaření - prakticky neviditelný stav
                            break;
                            case(1): //zadávání nicku
								ovladani = '<div id="ovladani"><div id="status">1</div><div id="info"><input class="longInput" placeholder="Zadejte rajče jméno, nebo odkaz na album.." '+((input)?'value="'+input+'"':'')+ 'name="nick" type="text"></div><div id="pokrok"><input type="button" value="Pokračovat" onclick="nextStep('+tab+');"></div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče</span></span></div>';
                                data = '<p>Zadejte přezdívku nebo odkaz na album (či uživatele) a stáhněte si fotky do svého počítače.</p><div class="start"><input type="text" name="nick" class="rNick nick" id="r1nick" placeholder="Zadejte rajče přezdívku nebo odkaz" '+((input)?'value="'+input+'"':'')+'><input type="button" name="next" id="r1next" onclick="nextStep('+tab+');" class="rNext next" value="Pokračovat"></div><script>document.getElementById("r1nick").onkeypress=function(e){if(e.keyCode==13){document.getElementById("r1next").click();}};document.getElementById("r1nick").focus();</script>';
                            break;
                            case(2): //získávám seznam alb...
								
								ovladani='<div id="ovladani"><div id="status">2</div><div id="info">'+nick+' >> Načítám seznam alb... </div><div id="pokrok">chvilinku</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče</span></span></div>';
                                data = '<p>Zadejte přezdívku nebo odkaz na album (či uživatele) a stáhněte si fotky do svého počítače.</p><div class="start"><input type="text" name="rNick" class="rNick nick" placeholder="Zadejte rajče přezdívku nebo odkaz" '+((input)?'value="'+input+'"':'')+'><input type="button" name="next" id="r1next" onclick="nextStep('+tab+');" class="rNext next" value="Pokračovat"></div>';
                            break;
							case(3): //výber z alb
								ovladani='<div id="ovladani"><div id="status">2</div><div id="info">'+nick+' >> Vyberte album </div><div id="pokrok">Pokračovat</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče</span></span></div>';
                                data = '<p>Kliknutím vyberte album, které se má stáhnout.</p><div class="vyber">';
							    for(var album in tabs[tab][navAlbums]){
                                    data += '<div class="rAlbum" onclick="rajceAlbumSelect(\''+tabs[tab][navAlbums][album]['url']+'\');"><div class="rNahled"><img src="'+tabs[tab][navAlbums][album]["img"]+'"></div><span class="rNazev nazev">'+tabs[tab][navAlbums][album]['name']+'</span><span class="rDatum">14.9.2013 (beta)</span><span class="rPocetFotek">32 fotek, 2 videa (beta)</span></div>';
    //                                <a class="rajceAlbum" ><div class="obrazekObal"><img src="'+tabs[tab][navAlbums][album]["img"]+'"></div><span class="albumName">'+tabs[tab][navAlbums][album]['name']+'</span></a>';
                                    //data+='<img src="'+ tabs[tabActual][navImages][iISmall][img]+'">';
                                }
                                data+='</div>';
                            break;
							case(4)://loaduje seznam fotek z konkrétního alba
                                ovladani = '<div id="ovladani"><div id="status">1</div><div id="info">'+nick+' >> Načítám '+tabs[tab][navAlbum]+' ...</div><div id="pokrok">Načítám</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče</span></span></div>';
                                data = '<p>Zadejte přezdívku nebo odkaz na album (či uživatele) a stáhněte si fotky do svého počítače.</p><div class="start"><input type="text" name="rNick" class="rNick nick" placeholder="Zadejte rajče přezdívku nebo odkaz" '+((input)?'value="'+input+'"':'')+'><input type="button" name="next" id="r1next" onclick="nextStep('+tab+');" class="rNext next" value="Pokračovat"></div><script>document.getElementById("r1nick").onkeypress=function(e){if(e.keyCode==13){document.getElementById("r1next").click();}};document.getElementById("r1nick").focus();</script>';
                            break;
							case(5): //zadávání hesla (když je album zamčené)
							    ovladani = '<div id="ovladani"><div id="status">1</div><div id="info"><input class="shortInputLeft" type="text" name="login" placeholder="Zadejte jméno.." ><input class="shortInputRight" type="password" name="password" placeholder="..a heslo k albu" ></div><div id="pokrok"><input type="button" value="Odemknout" onclick="tabs['+tab+'][navStatus]-=2;nextStep('+tab+');"></div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče</span></span></div>';
                                data = '<p>Uživatel má neveřejný profil. Přihlašte se jako vlastník nebo jako ten, kdo má oprávnění vidět jeho fotky</p><div class="auth"><input type="text" name="rUser" id="r2name" class="rUser user" placeholder="Jméno"><input type="password" id="r2password" name="rPass" class="rPass pass" placeholder="Heslo"><input type="button" name="unlock" class="rUnlock unlock" id="r2unlock" value="" onclick="tabs['+tab+'][navStatus]-=2;nextStep('+tab+');"></div></div><script>document.getElementById("r2password").onkeypress=function(e){if(e.keyCode==13){document.getElementById("r2unlock").click();}};document.getElementById("r2name").focus();</script>';



                            break;
							case(6)://zobrazení konkrétního alba
                                ovladani = '<div id="ovladani"><div id="status">1</div><div id="info">'+nick+' >> Načítám '+tabs[tab][navAlbum]+' ...</div><div id="pokrok"><input type="button" value="Stáhnout vše" onclick="nextStep('+tab+');"></div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče >> '+nick+' >> '+tabs[tab][navAlbumName]+'</span></span></div>';
                                data = '<p>Zadejte přezdívku nebo odkaz na album (či uživatele) a stáhněte si fotky do svého počítače.</p><div class="start"><input type="text" name="rNick" class="rNick nick" placeholder="Zadejte rajče přezdívku nebo odkaz" '+((input)?'value="'+input+'"':'')+'><input type="button" name="next" id="r1next" onclick="nextStep('+tab+');" class="rNext next" value="Pokračovat"></div><script>document.getElementById("r1nick").onkeypress=function(e){if(e.keyCode==13){document.getElementById("r1next").click();}};document.getElementById("r1nick").focus();</script>';
    						    for(var p in tabs[tab][navImages][iISmall]){
                                    data += '<div class="rajceObrazek"><img src="'+tabs[tab][navImages][iISmall][p]+'"><div class="options"><a class="zoom" onclick="rajceZoom(\''+tabs[tab][navImages][iIBig][p]+'\');" title="Zvětšit">Z</a> <a class="down" href="'+tabs[tab][navImages][iIBig][p]+'" title="Stáhnout obrázek" download="obrazekUrl">D</a></div></div>';
    						    }
                                
                                data='<div class="proces"><table class="info rInfo"><tr><th>Fotky:</th><td>'+celkem+'</td></tr><tr><th>Videa:</th><td>'+celkem+' (?)</td></tr><tr><th>Pole:</th><td>Co sem?</td></tr><tr><th>Staženo:</th><td>0/'+celkem+'</td></tr><tr><th>Stav:</th><td>Začínám stahovat</td></tr></table><div class="percent rPercent">??%</div></div>';
                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
        					    for(var p in tabs[tab][navImages][iISmall]){
                                    data += '<a class="rajceOdkaz"><img src="'+tabs[tab][navImages][iISmall][p]+'" class="rajceObrazek"></a>';
                                }
                                data+='</div>';
							break;
							case(7)://stahování alba
    							var stazeno = tabs[tab][navImages][iIdownloaded].length;
								var procento = Math.ceil(stazeno/(celkem/100));
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče >> '+nick+' >> '+tabs[tab][navAlbumName]+'</span></span></div>';
                                data='<div class="proces"><table class="info rInfo"><tr><th>Fotky:</th><td>'+celkem+'</td></tr><tr><th>Videa:</th><td>'+celkem+' (?)</td></tr><tr><th>Pole:</th><td>Co sem?</td></tr><tr><th>Staženo:</th><td>'+stazeno+'/'+celkem+'</td></tr><tr><th>Stav:</th><td>Stahování na server</td></tr></table><div class="percent rPercent">'+procento+'%</div></div>';
                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
            				    for(var p in tabs[tab][navImages][iISmall]){
                                    data += '<a class="rajceOdkaz"><img src="'+tabs[tab][navImages][iISmall][p]+'" class="rajceObrazek"></a>';
                                }
                                data+='</div>';
							break;
							case(8)://zipování
                                var stazeno = tabs[tab][navImages][iIdownloaded].length;
								var procento = Math.ceil(stazeno/(celkem/100));
                                ovladani = '<div id="ovladani"><div id="status">1</div><div id="info">'+nick+' >> Zipování '+tabs[tab][navAlbum]+' ...</div><div id="pokrok">chvilinku</div></div>';
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče >> '+nick+' >> '+tabs[tab][navAlbumName]+'</span></span></div>';
                                data='<div class="proces"><table class="info rInfo"><tr><th>Fotky:</th><td>'+celkem+'</td></tr><tr><th>Videa:</th><td>'+celkem+' (?)</td></tr><tr><th>Pole:</th><td>Co sem?</td></tr><tr><th>Staženo:</th><td>'+stazeno+'/'+celkem+'</td></tr><tr><th>Stav:</th><td>Zipování</td></tr></table><div class="percent rPercent">'+procento+'%</div></div>';
                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                			    for(var p in tabs[tab][navImages][iISmall]){
                                    data += '<a class="rajceOdkaz"><img src="'+tabs[tab][navImages][iISmall][p]+'" class="rajceObrazek"></a>';
                                }
                                data+='</div>';
							break;
							case(9)://hotovo
                                var stazeno = tabs[tab][navImages][iIdownloaded].length;
								var procento = Math.ceil(stazeno/(celkem/100));
                                var zip= tabs[tab][navZip];
                                lista = '<div class="wrapperLong"><span class="path"><span class="noclick">Rajče >> '+nick+' >> '+tabs[tab][navAlbumName]+'</span></span></div>';
                                data='<div class="proces"><table class="info rInfo"><tr><th>Fotky:</th><td>'+celkem+'</td></tr><tr><th>Videa:</th><td>'+celkem+' (?)</td></tr><tr><th>Pole:</th><td>Co sem?</td></tr><tr><th>Staženo:</th><td>'+stazeno+'/'+celkem+'</td></tr><tr><th>Stav:</th><td>Hotovo</td></tr></table><div class="percent rPercent"><a href="'+zip+'">Link</a></div></div>';
                                data+='<div class="nahledy"><span class="fotoKlik">Kliknutím na obrázky níže, můžete fotografie stáhnout jednotlivě</span><br>'
                			    for(var p in tabs[tab][navImages][iISmall]){
                                    data += '<a class="rajceOdkaz"><img src="'+tabs[tab][navImages][iISmall][p]+'" class="rajceObrazek"></a>';
                                }
                                data+='</div>';
							break;
						}
					break;
					default:
						ovladani = 'Vyberte službu. <input type="button" value="Instagram" onclick="instagramNew();"><input type="button" value="Rajče.net" onclick="rajceNew();">';
						data = '<h3>Výběr služby</h3><div class="services"><div class="ctverec" id="instagram" onclick="instagramNew();"><div id="placeholder"></div><div class="odlesk"></div><div class="detail"><span class="nazev">Instagram</span><span class="popis">Stáhněte si kterékoliv ze svých fotek na Instagramu pouhým kliknutím, či celou galerii v archivu zip, a to rychle a zdarma.</span><span class="prejit">..stačí kliknout..</span></div></div><div class="ctverec" id="rajce" onclick="rajceNew();"><div class="odlesk"></div><div class="detail"><span class="nazev">Rajče</span><span class="popis">Stáhněte si své fotografie či celá alba rychle a přehledně ze služby Rajče.net.</span><span class="prejit">Přejít na stahování</span></div></div><div class="ctverec" id="youtube"><div class="odlesk"></div><div class="detail"> <span class="nazev">Youtube</span><span class="popis">Stahujte videa z YouTube v MP4 nebo jen jako písničku v MP3.</span><span class="prejit disabled">Již brzy</span></div></div></div><h3>Co je to Opendown?</h3><p>Opendown je služba pro snadné a rychlé stažení vašich alb z populárních webových služeb (Instagram, Rajče.net, YouTube). Po výběru služby zadejte přezdívku nebo odkaz a vybraná alba fotek či videí se zabalí do jednoho zipu, který vám bude nabídnut ke stažení. V případě zamčenýh alb je nutné zadat přístupové údaje.</p><h3>Statistika</h3><p>Přehled využívání této služby připravujeme.</p>';
                        data = homepage;
                        if(!($('nav').hasClass('zeroHeight'))){
                                $('nav').addClass('zeroHeight');                                
                        }
                    	//$('nav').html(ovladani);
						$('article').html(data);
					break;
                }
                
				$('nav').html(lista);
                $('article').html(data);

                console.log('samotne vykresleni');
                
				if(tabActual !== tab){
                    tabActual= tab; //přepsání aktuálního tabu
                    drawTabs();
                }else{
                    tabActual= tab; //přepsání aktuálního tabu
                }
                console.log('tab '+tab+' vykreslen, nasleduje callback '+callback);
                callback();
            }
        }
    }
    function closeTab(tab){
        tabs[tab][navStatus] = 0; //nastavení na neexistující stav
        var posledni = posledni_z_pole_majici_hodnotu(tabs,"navStatus","0");
        var last = 0;
        var setted= false;
        if(tab == tabActual){
            if(tab < posledni){
                for(var item in tabs){//když tab není poslední - je za ním ještě někdo ... hledá a vrátí první za ním 
                    if(tabs[item][navStatus] !==0 & item>tab & setted===false){
                        last=item; setted = true;
                    }
                }
            }else{
                for(var i in tabs){
                    if(tabs[i][navStatus] !==0 & i>last & i<tab){
                        last=i;
                    }
                }
            }
            tabNext=last;
        }
        drawTabs();
        ocClose = true; //zapne stav zavírání
    }
    function drawTabs(){
	var tabsTemp = "";
        for(var tab in tabs){
            if(tabs[tab][navStatus] !==0){
                tabsTemp +='<a href="#" onclick="drawTab('+tab+');" ><li'+((tab==tabActual)?' class="'+tabs[tabActual][navHref]+'Tab"':'')+'>'+tabs[tab][navName]+((tabs[tab][navClose])?' <span class="closeTab" onclick="closeTab('+tab+');">X</span>':"")+'</li></a>';
            }
        }    
	$("ul").html(tabsTemp);
	}
    function instagramNew(){
        tabs.push({
            navService: sInstagram,
            navName :"Instagram",
            navHref :"instagam",
            navClose: true,
            navColor:'lightblue',
            navNick : '',
            navStatus:0,
            navZmena:true,
            navInterval:'nic',
            navIntervalJson:0,
            navVolno: true,
            navInstagramLastId:'',
            navCelkem:'',
			navZip:'',
            navImages:{
                iISmall:[],
                iIBig:[],
                toDownload:[],
                iIdownloaded:[]
            }
        });
        nextStep(tabs.length-1);
        drawTabs();
        drawTab(tabs.length-1);
    }
	function rajceNew(){
        tabs.push({
            navService: sRajce,
            navName :"Rajče",
            navHref :"rajce",
            navClose: true,
            navColor:'red',
            navNick : '',
			navInput:'',
			navAlbum:'',
            navLogin:'',
            navPassword:'',
            navStatus:0,
            navZmena:true,
            navInterval:'nic',
            navIntervalJson:0,
            navVolno: true,
            navCelkem:'',
			navZip:'',
			navAlbumName:'',
            navAlbums:'',
            navImages:{
                iISmall:[],
                iIBig:[],
                toDownload:[],
                iIdownloaded:[]
            }
        });
        nextStep(tabs.length-1);
        drawTabs();
        drawTab(tabs.length-1);
    }
    function posledni_z_pole_majici_hodnotu(arr,key,value){
        var pocet = "";
        var last = 0;
        for(var item in arr){
            if(arr[item][key] !== 0){last = item;pocet++;}
        }
        return last;
    }
    function vypsatObsahPole(){
        var data = "";
        for(var i in tabs){
            data+= "\n"+i+" "+tabs[i][navStatus];
        }
        //alert(data);
    }
	function nextStep(tab){ // zařídí přechod do dalšího stavu a překreslí
		switch(tabs[tab][navService]){//typ co vykreslit podle druhu služby
            case(sInstagram): //Jak vykreslovat Instagram ve stavech:
                tabs[tab][navStatus]++;
				tabs[tab][navZmena]=true;
                console.log('fceNextStep: tab '+tab+' povýšil na status '+tabs[tab][navStatus]);
                drawTab(tab);
                switch(tabs[tab][navStatus]){
                    case(1): //zadávání nicku
                        console.log("Zapínání intervalu nickChecking");
                        tabs[tab][navInterval]=setInterval(function(){instagramNickChecking(tab);},200);
                    break;
                    case(2): //stahování JSON dat
                        console.log("zastavení nicku, interval loadingu");
						clearInterval(tabs[tab][navInterval]);
                        tabs[tab][navIntervalJson]=setInterval(function(){instagramJsonLoading(tab);},500);
                    break;
                    case(3): //rovnou dál
                        nextStep(tab);
                    break;
					case(4): //zapíná automatické stahování všeho na server
						tabs[tab][navIntervalJson] = setInterval(function(){instagramDownloadingToServer(tab);},300);
					break;
					case(5): // zapne zipování
						instagramZiping(tab);
					break;
					case(6): // vypíše zip
					break;
               }
            break;
			case(sRajce): //Jak vykreslovat Instagram ve stavech:
                tabs[tab][navStatus]++;
				tabs[tab][navZmena]=true;
				console.log('Rajče fceNextStep: tab '+tab+' povýšil na status '+tabs[tab][navStatus]);
                clearInterval(tabs[tab][navInterval]);
				switch(tabs[tab][navStatus]){
                    case(1): //zadávání nicku
                        console.log("Rajče Zapínání intervalu rajceNickChecking");
                        tabs[tab][navInterval]=setInterval(function(){rajceNickChecking(tab);},200);
                    break;
					case(2)://získávání seznamu alb
						if(tabs[tab][navNick] == ''){
							alert("Nepodporovaný formát: přezdívka, odkaz na uživatele nebo na album");
							tabs[tab][navStatus]--;
							drawTab(tab);
						}
						else{
							if(tabs[tab][navAlbum] !== ''){ //když znám konkrétní album
								tabs[tab][navStatus]++; //získávání konkrétního alba
                                nextStep(tab);//přidá další ++ takže se dostane kam má
							}
							else{//Loaduje seznam všch alb uživatele
                                rajceAlbumsLoading(tab);
							}
						}
					break;
					case(3)://zobrazí seznam alb
                    break;
					case(4)://zís => status++
                        
                        rajceAlbumLoading(tab);
					break;
					case(5)://zadávání hesla
					    tabs[tab][navInterval] = setInterval(function(){rajceLoginAndPasswordChecking(tab);},300);
                        //Vrací na stahování alba...
					break;
					case(6)://zobrazení konkrétního alba - rovnou dál
                        nextStep(tab);
					break;
					case(7)://stahování alba na server
                        tabs[tab][navInterval] = setInterval(function(){rajceDownloadingToServer(tab);},300);
					break;
					case(8)://zipování
                        rajceZiping(tab);
					break;
					case(9)://hotovo
					break;
               }
            break;
        }
        drawTab(tab);
	}
    function prazdnyCB(){
        console.log("empty callback");
    }
    function rajceNickChecking(mistniTab){
        if(mistniTab == tabActual){
            var savedNick = tabs[mistniTab][navNick];
            var savedInput = tabs[mistniTab][navInput];
            var actualInput = $("input[type=text][name=nick]").val();
			if(actualInput !== savedInput){
				tabs[tabActual][navInput] = actualInput;
				var actualNick = actualInput;
				var actualAlbum = actualInput;
				
				if(REwww.test(actualNick))
					actualNick = (REwww.exec(actualNick)[1]);
				if(REhttp.test(actualNick))
					actualNick = (REhttp.exec(actualNick)[1]);
				if(REnone.test(actualNick))
					actualNick = (REnone.exec(actualNick)[1]);
				//if(actualNick == actualInput)
				//	actualNick ='';
				
				while(actualInput.charAt(actualInput.length-1) == "/") {
					actualInput=actualInput.slice(0, -1);
					actualAlbum = actualInput;
				}	
				if(RErajce.test(actualAlbum))
					actualAlbum = (RErajce.exec(actualAlbum).slice(-1)[0]);
				if(actualAlbum==actualInput || actualAlbum.charAt(0)=='?'){
					actualAlbum='';
				}
                if(actualAlbum !=='')
                    actualAlbum = "http://"+actualNick+".rajce.idnes.cz/"+actualAlbum;
				tabs[mistniTab][navAlbum] = actualAlbum;
				tabs[tabActual][navNick] = actualNick;
                console.log('rajce nick interval '+actualInput+' => '+actualNick+', '+actualAlbum);
            }
        }   
    }
    function rajceAlbumsLoading(mistniTab){
        console.log('Rajče - načítám alba');
            var url = baseUrl+"functions/rajceAlba.php";
            $.ajax({
                type: "GET",
                async: false,
                url: url+'?nick='+tabs[mistniTab][navNick],
                cache: false,
                success: function (json) {
                    var obj = JSON.parse(json);
                    tabs[mistniTab][navAlbums] = obj['albums'];
                    nextStep(mistniTab);
                },
                error: function(){
                alert("Chyba - alba nebyla načtena. Opakujte akci.");
                }
            });
    }
    function rajceAlbumLoading(mistniTab){
        console.log('Rajče - načítám album');
        var url;
        if(tabs[mistniTab][navLogin] === '' || tabs[mistniTab][navPassword] === ''){
            url = baseUrl+"functions/rajceAlbum.php"+'?url='+tabs[mistniTab][navAlbum];
        }else{
            url = baseUrl+"functions/rajceAlbum.php"+'?url='+tabs[mistniTab][navAlbum]+'&password='+tabs[mistniTab][navPassword]+'&login='+tabs[mistniTab][navLogin];
        }
        console.log("Ajax: "+url);
            $.ajax({
                type: "GET",
                async: false,
                url: url,
                cache: false,
                success: function (json) {
                    var obj = JSON.parse(json);
                    if(obj['status']=='ok'){
                        for(var p in obj['photos']){
                            tabs[mistniTab][navImages][iISmall].push(obj['photos'][p]['url'].replace('images','thumb'));
                            tabs[mistniTab][navImages][iIBig].push(obj['photos'][p]['url']);
                        }
                        tabs[mistniTab][navAlbumName] = obj['album'][0]['name'];
                        console.log('Staženo: '+tabs[mistniTab][navAlbumName]);
                        tabs[mistniTab][navCelkem] = tabs[mistniTab][navImages][iIBig].length;
                        tabs[mistniTab][navStatus]++;
                        nextStep(mistniTab);
                    }else{
                        nextStep(mistniTab);
                    }
                },
                error: function(){
                    alert("no");
                }
            });
    }
    function rajceAlbumSelect(albumUrl){
        tabs[tabActual][navAlbum]=albumUrl;
        nextStep(tabActual);
        
    }
    function rajceLoginAndPasswordChecking(mistniTab){
        if(mistniTab == tabActual){
            var savedPassword = tabs[mistniTab][navPassword];
            var savedLogin = tabs[mistniTab][navLogin];
            var actualPassword = $("input[type=password]").val();
            var actualLogin = $("input[type=text]").val();
        	if(actualPassword !== savedPassword) tabs[tabActual][navPassword] = actualPassword;
        	if(actualLogin !== savedLogin) tabs[tabActual][navLogin] = actualLogin;
        }
    }
    function rajceDownloadingToServer(mistniTab){
        if(tabs[mistniTab][navVolno]){
            tabs[mistniTab][navVolno] = false;
            var url = baseUrl+"functions/rajceDown.php";  
    		var images = '';
			var posledni = tabs[mistniTab][navCelkem];
			var maxNaJeden =100;
			var pocetRequestu = 10;
			while(posledni/pocetRequestu>maxNaJeden){
				pocetRequestu++;
			}
			var limit =  Math.ceil(posledni/pocetRequestu);
	        var startImage = tabs[mistniTab][navImages][iIdownloaded].length;
			var delatDo = (startImage+limit);
			if(delatDo > posledni){
				delatDo = posledni;
				limit = delatDo-startImage;
			}
			console.log('downloading to server limit: '+limit+' .Celkem to bude na várek: '+pocetRequestu);

    		for(var i = startImage; i<delatDo;i++){
				if(i!==startImage)images+=odd;
				images += tabs[mistniTab][navImages][iIBig][i];
				//tabs[mistniTab][navImages][iIdownloaded].push(true);
			}
			console.log('Posílám požadavek pro: '+images);
            $.ajax({
                type: "POST",
                async: true,
				data: 'key='+applicationKey+'&url='+images+"&tab="+mistniTab,
                url: url,
                cache: false,
                success: function (data) {
					clearInterval(zatimcoAjaxPracuje); //zastaví falešný pokrok
					for(var j = 0; j<limit;j++){ //doplní co falešný pokrok nestihl
						tabs[mistniTab][navImages][iIdownloaded].push(true);
						tabs[mistniTab][navZmena]=true;
						}
						if(delatDo>=posledni){ //když je posledná fotka
							clearInterval(tabs[mistniTab][navInterval]); //zastaví interval stahování
							console.log('stahovani dokonceno');
							nextStep(mistniTab);
						}
						tabs[mistniTab][navVolno]=true;
	
				},
                error: function(){
					alert('Error! - Část stahovaných dat je tutam, prosím, zkuste znovu');
                }
            });
			var zatimcoAjaxPracuje = setInterval(function(){
						console.log('mozna pridam... '+limit);
						if(limit>0){
							limit--;
							tabs[mistniTab][navImages][iIdownloaded].push(true);
							tabs[mistniTab][navZmena]=true;
						}
					},1000);
			}
    }
    function rajceZiping(mistniTab){
		console.log('start rajce zipování');
		var url = baseUrl+'functions/rajceZip.php';
        $.ajax({
            type: "POST",
            async: true,
			data: 'key='+applicationKey+'&tab='+mistniTab,
            url: url,
            cache: false,
            success: function (data) {
					console.log('zipování dokončeno');
					tabs[mistniTab][navZip] = data;
					tabs[mistniTab][navZmena] = true;
					nextStep(mistniTab);
				},
                error: function(){
					alert('Error! - Zipování se nepovedlo :(');
                }
            });
	}
    

    function instagramNickChecking(mistniTab){
        if(mistniTab == tabActual){
            var nick = tabs[mistniTab][navNick];
            var input = $("input[type=text][name=nick]").val();
            if(input !== nick){
                tabs[tabActual][navNick] = input;
                console.log('interval '+input);
            }
        }
    }
    function instagramJsonLoading(mistniTab){
        if(tabs[mistniTab][navVolno]){
            tabs[mistniTab][navVolno]=false;
            var url = baseUrl+"functions/instagramMedia.php";
            var ma;
            $.ajax({
                type: "GET",
                async: false,
                url: url+'?nick='+tabs[mistniTab][navNick]+'&max_id='+tabs[mistniTab][navInstagramLastId],
                cache: false,
                success: function (json) {
                    var obj = JSON.parse(json);
                    if(obj['status'] == 'ok'){
                        ma = obj['more_available'];
                        for(var item in obj['items']){
                            tabs[mistniTab][navInstagramLastId] = obj['items'][item]['id'];
                            tabs[mistniTab][navImages][iISmall].push(obj['items'][item]['images']['thumbnail']['url']);
                            var downFile;
                            if(obj['items'][item]['type']== 'video'){
                                downFile=obj['items'][item]['videos']['standard_resolution']['url'];
                            }else{
                                downFile = obj['items'][item]['images']['standard_resolution']['url'];
                            }
                            tabs[mistniTab][navImages][iIBig].push(downFile);
                            tabs[mistniTab][navZmena]=true;
                        }
                    }else{
                        ma=false;
                    }
                        if(ma!==true){
                            clearInterval(tabs[mistniTab][navIntervalJson]);
                            console.log('nacitani ukonceno');
                            tabs[mistniTab][navCelkem] = tabs[mistniTab][navImages][iIBig].length;
                            nextStep(mistniTab);
                        }else{
                            console.log('next XHR');
                        }
                         tabs[mistniTab][navVolno]=true;   
                },
                error: function(){
                    alert("no");
                    ma = false;
                }
            });
        }
    }
    function instagramDownloadingToServer(mistniTab){
        if(tabs[mistniTab][navVolno]){
            tabs[mistniTab][navVolno] = false;
            var url = baseUrl+"functions/instagramDown.php";  
			var images = '';
			var posledni = tabs[mistniTab][navCelkem];
			var maxNaJeden =100;
			var pocetRequestu = 10;
			while(posledni/pocetRequestu>maxNaJeden){
				pocetRequestu++;
			}
			var limit =  Math.ceil(posledni/pocetRequestu);
	        var startImage = tabs[mistniTab][navImages][iIdownloaded].length;
			var delatDo = (startImage+limit);
			if(delatDo > posledni){
				delatDo = posledni;
				limit = delatDo-startImage;
			}
			console.log('downloading to server limit: '+limit+' .Celkem to bude na várek: '+pocetRequestu);

    		for(var i = startImage; i<delatDo;i++){
				if(i!==startImage)images+=odd;
				images += tabs[mistniTab][navImages][iIBig][i];
				//tabs[mistniTab][navImages][iIdownloaded].push(true);
			}
			console.log('Posílám požadavek pro: '+images);
            $.ajax({
                type: "POST",
                async: true,
				data: 'key='+applicationKey+'&url='+images,
                url: url,
                cache: false,
                success: function (data) {
					clearInterval(zatimcoAjaxPracuje); //zastaví falešný pokrok
					for(var j = 0; j<limit;j++){ //doplní co falešný pokrok nestihl
						tabs[mistniTab][navImages][iIdownloaded].push(true);
						tabs[mistniTab][navZmena]=true;
						}
						if(delatDo>=posledni){ //když je posledná fotka
							clearInterval(tabs[mistniTab][navIntervalJson]); //zastaví interval stahování
							console.log('stahovani dokonceno');
							nextStep(mistniTab);
						}
						tabs[mistniTab][navVolno]=true;
	
				},
                error: function(){
					alert('Error! - Část stahovaných dat je tutam, prosím, zkuste znovu');
                }
            });
			var zatimcoAjaxPracuje = setInterval(function(){
						console.log('mozna pridam... '+limit);
						if(limit>0){
							limit--;
							tabs[mistniTab][navImages][iIdownloaded].push(true);
							tabs[mistniTab][navZmena]=true;
						}
					},1000);
			}
    }
	function instagramZiping(mistniTab){
		console.log('start zipování');
		var celkem = tabs[mistniTab][navCelkem];
		var url = baseUrl+'functions/instagramZip.php';
		
        $.ajax({
            type: "POST",
            async: true,
			data: 'key='+applicationKey,
            url: url,
            cache: false,
            success: function (data) {
					console.log('zipování dokončeno');
					tabs[mistniTab][navZip] = data;
					tabs[mistniTab][navZmena] = true;
					nextStep(mistniTab);
				},
                error: function(){
					alert('Error! - Zipování se nepovedlo :(');
                }
            });
	}
    function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 9; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

    $(document).ready(function(){
        window.applicationKey = makeid();
        console.log('kod: '+applicationKey);
        //drawTabs();
        homepage = $('article').html();
        
        drawTab(tabNext);
        setInterval(function(){drawTab(tabNext);},500);
        $('#placeholder').crossSlide({
  fade: 1
}, [
  {
    src:  'img/i1.jpg',
    from: '100% 80% 1x',
    to:   '100% 60% 1.7x',
    time: 6
  }, {
    src:  'img/i2.jpg',
    from: 'top left',
    to:   'bottom right 1.5x',
    time: 6
  }, {
    src:  'img/i3.jpg',
    from: '100% 80% 1.5x',
    to:   '80% 50% 1.1x',
    time: 6
  }, {
    src:  'img/i4.jpg',
    from: '100% 50%',
    to:   '40% 50% 1.5x',
    time: 6
  }
], function(idx, img, idxOut, imgOut) {
  if (idxOut == undefined) {
    // starting single image phase, put up caption
    $('div.caption').text(img.alt).animate({opacity: .7})
  } else {
    // starting cross-fade phase, take out caption
    $('div.caption').fadeOut()
  }
});
        $('#placeholder2').crossSlide({
  fade: 1
}, [
  {
    src:  'img/r4.jpg',
    from: '100% 80% 1x',
    to:   '100% 60% 1.7x',
    time: 6
  }, {
    src:  'img/r2.jpg',
    from: 'top left',
    to:   'bottom right 1.5x',
    time: 6
  }, {
    src:  'img/r3.jpg',
    from: '100% 80% 1.5x',
    to:   '80% 50% 1.1x',
    time: 6
  }, {
    src:  'img/r1.jpg',
    from: '100% 80% 1.5x',
    to:   '80% 50% 1.1x',
    time: 6
  }
], function(idx, img, idxOut, imgOut) {
  if (idxOut == undefined) {
    // starting single image phase, put up caption
    $('div.caption').text(img.alt).animate({opacity: .7})
  } else {
    // starting cross-fade phase, take out caption
    $('div.caption').fadeOut()
  }
});

    });
    
    
    //konec 
    