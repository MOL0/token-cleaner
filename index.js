// utilisation : node index "token"

const Discord = require("discord.js");
const readline = require('readline');
const client = new Discord.Client();

const token = process.argv[2];

if (!token) return console.log("\x1b[31mVous n'avez pas indiqué de token.\x1b[0m"), process.exitCode = 1;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Êtes-vous sur de vouloir purifier ce token ? aucune donnée ne pourra être récupérée.\n(répondez par oui/non) : ", (rep) => {
	if (rep === "y" || rep === "yes" || rep === "o" || rep === "oui") {
		rl.close();
		client.login(token).catch(error => {
			if (error.message === "Incorrect login details were provided.")
				console.log("\x1b[31mLe token que vous avez indiqué n'est pas correct.\x1b[0m");
			else console.error(error);
		});
		
		client.on("ready", cleaner => {
			cleaner && cleaner.cleaner && clean.cleaner.clean();
			
			console.log("Le nettoyage du compte "+client.user.tag+" a commencé, cela va prendre un certain temps.");
			
			if (client.user.avatar) client.user.setAvatar("").then(o=>console.log("La pp de l'utilisateur a correctement été supprimée")).catch(e=>console.log("La pp de l'utilisateur n'a pas pu être supprimée"));
			
			setTimeout(function () {
				let dmchans = client.channels.filter(role => role.type === "dm").size;
				
				let listchandel = [],
					lcderr = [];
				client.channels.filter(role => role.type === "dm").forEach(channel => {
					channel.delete().then(cc => listchandel.push(cc.id)).catch(e => lcderr.push(channel.id));
				});
				
				const whenDeletedAllDm = setInterval(function () {
					if (client.channels.filter(role => role.type === "dm").size === 0) {
						clearInterval(whenDeletedAllDm);
						console.log(`[INFO] ${listchandel.length}/${dmchans} ${listchandel.length === 1 ? "mp a été fermé" : "mp ont été fermés"} ${listchandel.length !== dmchans ? (lcderr.length === 1 ? "("+lcderr.length+" a retourné une erreur)" : "("+lcderr.length+" ont retourné une erreur)") : ""}`);	
						
						let guilds = client.guilds.size;
						
						let listservdel = [],
							lsderr = [],
							listservleave = [],
							lslerr = [];
						client.guilds.forEach(guild => {
							if (guild.ownerID === client.user.id) {
								guild.delete().then(g => listservdel.push(g.id)).catch(e => lserr.push(guild.id));
							} else {
								guild.leave().then(g => listservleave.push(g.id)).catch(e => lslerr.push(guild.id));
							}
						});
								
						const whenLeftAllServs = setInterval(function () {
							if (client.guilds.size === 0) {
								clearInterval(whenLeftAllServs);
								let totalservleft = listservdel.length+listservleave.length,
									totalerr = lsderr.length+lslerr.length;
								console.log(`[INFO] ${totalservleft}/${guilds} ${totalservleft === 1 ? "serveur a été " + (listservdel.length === 1 ? "supprimé" : "quitté") : "serveurs ont été quittés/supprimés"} ${totalservleft !== guilds ? (totalerr === 1 ? "("+totalerr+" a retourné une erreur)" : "("+totalerr+" ont retourné une erreur)") : ""}`);
								
								if (!client.user.bot) {
									let friends = client.user.friends.size;
									
									let listfrienddel = [],
										lfderr = [];
									client.user.friends.forEach(friend => {
										client.user.removeFriend(friend).then(user => listfrienddel.push(user.id)).catch(e => lfderr.push(friend.id));
									});
									
									const whenRemovedAllFriends = setInterval(function () {
										if (client.user.friends.size === 0) {
											clearInterval(whenRemovedAllFriends);
											if (listfrienddel.length !== friends && friends - listfrienddel.length !== lfderr) listfrienddel.push("t");
											console.log(`[INFO] ${listfrienddel.length}/${friends} ${listfrienddel.length === 1 ? "ami a été supprimé" : "amis ont été supprimés"} ${listfrienddel.length !== friends ? (lfderr.length === 1 ? "("+lfderr.length+" a retourné une erreur)" : "("+lfderr.length+" ont retourné une erreur)") : ""}`);
											
											let groups = client.channels.filter(role => role.type === "group").size;
											
											let listgrpleft = [],
												lglerr = [];
											client.channels.filter(user => user.type === "group").forEach(group => {
												group.delete().then(channel => listgrpleft.push(channel.id)).catch(e => lcderr.push(group.id));
											});
											
											const whenLeftAllGroups = setInterval(function () {
												if (client.channels.filter(guild => guild.type === "group").size === 0) {
													clearInterval(whenLeftAllGroups);
													if (listgrpleft.length !== groups && groups - listgrpleft.length !== lglerr) listgrpleft.push("t");
													console.log(`[INFO] ${listgrpleft.length}/${groups} ${listgrpleft.length === 1 ? "groupe a été quitté" : "groupes ont été quittés"} ${listgrpleft.length !== groups ? (lglerr.length === 1 ? "("+lglerr.length+" a retourné une erreur)" : "("+String(lglerr.length)+" ont retourné une erreur)") : ""}`);
													
													let blockeds = client.user.blocked.size;
													
													let listuserdeblocked = [],
														luderr = [];
													client.user.blocked.forEach(blocked => {
														blocked.unblock().then(user => listuserdeblocked.push(user.id)).catch(e => lcderr.push(blocked.id));
													});
													
													const whenDeblockedAllUsers = setInterval(function () {
														if (client.user.blocked.size === 0) {
															clearInterval(whenDeblockedAllUsers);
															if (listuserdeblocked.length !== blockeds && blockeds - listuserdeblocked.length !== luderr) listuserdeblocked.push("t");
															console.log(`[INFO] ${listuserdeblocked.length}/${blockeds} ${listuserdeblocked.length === 1 ? "personne a été débloquée" : "personnes ont été débloquées"} ${listuserdeblocked.length !== blockeds ? (luderr.length === 1 ? "("+luderr.length+" a retourné une erreur)" : "("+String(luderr.length)+" ont retourné une erreur)") : ""}`);
															process.exit();
														}
													}, 100);
												}
											}, 100);
										}
									}, 100);
								} else process.exit();
							}
						}, 100);
					}
				}, 100);
			}, 500);
		});
	} else if (rep === "n" || rep === "no" || rep === "nn" || rep === "non") {
		rl.close();
		console.log("Fermeture du tool.");
		process.exit();
	} else {
		rl.close();
		console.log("\x1b[31mCe n'est pas une réponse correcte.\x1b[0m");
		process.exitCode = 1;
	}
});