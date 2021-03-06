const mobzone = [1023], //zone ids of mobs
	mobtemplate = [88888888];  //template ids of mobs
	
module.exports = function markmob(dispatch) {
	let markenabled=true;
	let player,
		ind;

	let countarr = [],
		moblocationx = [],
		moblocationy = [],
		moblocationz = [];
		
	dispatch.hook('S_LOGIN', 1, event => {
		player = event.playerId;
	});
	
	dispatch.hook('C_CHAT', 1, event => {
		if(/^<FONT>!mobmarker on<\/FONT>$/i.test(event.message)) {
			markenabled=true,
			message('Mob marker enabled');
		};
		
		if(/^<FONT>!mobmarker off<\/FONT>$/i.test(event.message)) {
			markenabled=false,
			moblocation = [],
			message('Mob marker disabled');
		};
		
		if(/^<FONT>!mobmarker clear<\/FONT>$/i.test(event.message)) {
			for (i = 0; i < countarr.length; i++) {
				despawnthis(countarr[i]);
			};
			countarr=[],
			moblocationx = [],
			moblocationy = [],
			moblocationz = [],
			message('Mob marker clear attempted');
		};
		
		if(event.message.includes('!mobmarker'))
			return false;
	});
	
	dispatch.hook('S_SPAWN_NPC', 3, (event) => {
		if(markenabled && (mobzone.includes(event.huntingZoneId) && mobtemplate.includes(event.templateId))) { 
			for (i = 0; i < (moblocationx.length+1); i++) { 
				if (i === moblocationx.length) {
					moblocationx[i] = event.x,
					moblocationy[i] = event.y,
					moblocationz[i] = event.z,
					countarr[i]= (player+1+(i)),
					markthis(countarr[i],(i));
					break;
				};
			};
		};
	}); 

	dispatch.hook('S_DESPAWN_NPC', 1, event => {
		if(moblocationx.includes(event.x) && moblocationy.includes(event.y) && moblocationz.includes(event.z)) {
			ind = moblocationx.indexOf(event.x),
			despawnthis(countarr[ind]),
			moblocationx.splice(ind,1),
			moblocationy.splice(ind,1),
			moblocationz.splice(ind,1),
			countarr.splice(ind,1);
		};
	}); 
	
	function markthis(targetid,inx) {
		dispatch.toClient('S_SPAWN_DROPITEM', 1, {
			id: targetid,
			x: moblocationx[inx],
			y: moblocationy[inx],
			z: moblocationz[inx],
			item: 98260, //itemid
			amount: 1,
			expiry: 300000, //expiry time
			owners: [{id: player}]
		});	
	};
		
	function despawnthis(despawnid) {
		dispatch.toClient('S_DESPAWN_DROPITEM', 1, {
				id: despawnid
		});	
		
	};

	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: '(Proxy)' + msg
		})
	};
};
