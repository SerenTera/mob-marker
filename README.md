# mob-marker
Spawns vergos head as indicator on mobs (bluebox)

A Tera Proxy module that spawns vergos head as an indicator on mobs(blueboxes,caimans etc). Works best when mob is stationary, but could be used for mongos in future with some modifications.

The indicator is spawned at the location of the mob and automatically despawns when the mob is killed/ the mob goes out of your sight(it will respawn once it enters your sight again). If somehow theres any bug in despawning the vergos head, there is a debug command available to reset the module.

Commands:

!mobmarker on- Switches on module

!mobmarker off- Switches off module

!mobmarker clear-Clears all saved mobs entries and resets the module. Use this if vergos head somehow failed to despawn after killing mob.

This is tested only with blue boxes and they spawn mostly 1 in the viscible vicinity. I tried to make my mods work with >2 mobs in the visible vicinity but it is hard to test this. Report any bugs you have when 2 boxes are in your viscible vicinity, vergos head should spawn at both boxes.
