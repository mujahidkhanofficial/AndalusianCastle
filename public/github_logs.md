2026-01-11T21:51:33.5431252Z Current runner version: '2.330.0'
2026-01-11T21:51:33.5461368Z ##[group]Runner Image Provisioner
2026-01-11T21:51:33.5462616Z Hosted Compute Agent
2026-01-11T21:51:33.5463714Z Version: 20251211.462
2026-01-11T21:51:33.5464687Z Commit: 6cbad8c2bb55d58165063d031ccabf57e2d2db61
2026-01-11T21:51:33.5466022Z Build Date: 2025-12-11T16:28:49Z
2026-01-11T21:51:33.5467163Z Worker ID: {2f74305b-b30a-464d-994e-663255fb839d}
2026-01-11T21:51:33.5468335Z ##[endgroup]
2026-01-11T21:51:33.5469267Z ##[group]Operating System
2026-01-11T21:51:33.5470328Z Ubuntu
2026-01-11T21:51:33.5471199Z 24.04.3
2026-01-11T21:51:33.5471957Z LTS
2026-01-11T21:51:33.5472908Z ##[endgroup]
2026-01-11T21:51:33.5473700Z ##[group]Runner Image
2026-01-11T21:51:33.5474333Z Image: ubuntu-24.04
2026-01-11T21:51:33.5474939Z Version: 20260105.202.1
2026-01-11T21:51:33.5476377Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20260105.202/images/ubuntu/Ubuntu2404-Readme.md
2026-01-11T21:51:33.5477905Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20260105.202
2026-01-11T21:51:33.5479021Z ##[endgroup]
2026-01-11T21:51:33.5480147Z ##[group]GITHUB_TOKEN Permissions
2026-01-11T21:51:33.5482178Z Contents: read
2026-01-11T21:51:33.5482697Z Metadata: read
2026-01-11T21:51:33.5483261Z Packages: read
2026-01-11T21:51:33.5483740Z ##[endgroup]
2026-01-11T21:51:33.5485982Z Secret source: Actions
2026-01-11T21:51:33.5486875Z Prepare workflow directory
2026-01-11T21:51:33.5924962Z Prepare all required actions
2026-01-11T21:51:33.5979469Z Getting action download info
2026-01-11T21:51:33.9478245Z Download action repository 'actions/checkout@v4' (SHA:34e114876b0b11c390a56381ad16ebd13914f8d5)
2026-01-11T21:51:34.0459268Z Download action repository 'actions/setup-node@v4' (SHA:49933ea5288caeca8642d1e84afbd3f7d6820020)
2026-01-11T21:51:34.1737167Z Download action repository 'treosh/lighthouse-ci-action@v11' (SHA:72f881228236981b625ed765b928efb1786a1f55)
2026-01-11T21:51:36.8971040Z Complete job name: lighthouse
2026-01-11T21:51:36.9626842Z ##[group]Run actions/checkout@v4
2026-01-11T21:51:36.9627456Z with:
2026-01-11T21:51:36.9627742Z   repository: mujahidkhanofficial/AndalusianCastle
2026-01-11T21:51:36.9628245Z   token: ***
2026-01-11T21:51:36.9628469Z   ssh-strict: true
2026-01-11T21:51:36.9628690Z   ssh-user: git
2026-01-11T21:51:36.9628924Z   persist-credentials: true
2026-01-11T21:51:36.9629178Z   clean: true
2026-01-11T21:51:36.9629421Z   sparse-checkout-cone-mode: true
2026-01-11T21:51:36.9629693Z   fetch-depth: 1
2026-01-11T21:51:36.9629924Z   fetch-tags: false
2026-01-11T21:51:36.9630166Z   show-progress: true
2026-01-11T21:51:36.9630388Z   lfs: false
2026-01-11T21:51:36.9630599Z   submodules: false
2026-01-11T21:51:36.9630831Z   set-safe-directory: true
2026-01-11T21:51:36.9631280Z ##[endgroup]
2026-01-11T21:51:37.0730913Z Syncing repository: mujahidkhanofficial/AndalusianCastle
2026-01-11T21:51:37.0733138Z ##[group]Getting Git version info
2026-01-11T21:51:37.0734026Z Working directory is '/home/runner/work/AndalusianCastle/AndalusianCastle'
2026-01-11T21:51:37.0735438Z [command]/usr/bin/git version
2026-01-11T21:51:37.0814729Z git version 2.52.0
2026-01-11T21:51:37.0841675Z ##[endgroup]
2026-01-11T21:51:37.0864626Z Temporarily overriding HOME='/home/runner/work/_temp/de1d72de-854f-4bf9-846a-afb9335f38b0' before making global git config changes
2026-01-11T21:51:37.0866366Z Adding repository directory to the temporary git global config as a safe directory
2026-01-11T21:51:37.0871223Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/AndalusianCastle/AndalusianCastle
2026-01-11T21:51:37.0914358Z Deleting the contents of '/home/runner/work/AndalusianCastle/AndalusianCastle'
2026-01-11T21:51:37.0918319Z ##[group]Initializing the repository
2026-01-11T21:51:37.0922862Z [command]/usr/bin/git init /home/runner/work/AndalusianCastle/AndalusianCastle
2026-01-11T21:51:37.1083419Z hint: Using 'master' as the name for the initial branch. This default branch name
2026-01-11T21:51:37.1084677Z hint: will change to "main" in Git 3.0. To configure the initial branch name
2026-01-11T21:51:37.1085895Z hint: to use in all of your new repositories, which will suppress this warning,
2026-01-11T21:51:37.1086433Z hint: call:
2026-01-11T21:51:37.1086900Z hint:
2026-01-11T21:51:37.1087523Z hint: 	git config --global init.defaultBranch <name>
2026-01-11T21:51:37.1088150Z hint:
2026-01-11T21:51:37.1088557Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2026-01-11T21:51:37.1089684Z hint: 'development'. The just-created branch can be renamed via this command:
2026-01-11T21:51:37.1090683Z hint:
2026-01-11T21:51:37.1091218Z hint: 	git branch -m <name>
2026-01-11T21:51:37.1091811Z hint:
2026-01-11T21:51:37.1092618Z hint: Disable this message with "git config set advice.defaultBranchName false"
2026-01-11T21:51:37.1094173Z Initialized empty Git repository in /home/runner/work/AndalusianCastle/AndalusianCastle/.git/
2026-01-11T21:51:37.1101428Z [command]/usr/bin/git remote add origin https://github.com/mujahidkhanofficial/AndalusianCastle
2026-01-11T21:51:37.1135051Z ##[endgroup]
2026-01-11T21:51:37.1136004Z ##[group]Disabling automatic garbage collection
2026-01-11T21:51:37.1140196Z [command]/usr/bin/git config --local gc.auto 0
2026-01-11T21:51:37.1167954Z ##[endgroup]
2026-01-11T21:51:37.1168714Z ##[group]Setting up auth
2026-01-11T21:51:37.1175444Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-01-11T21:51:37.1205038Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-01-11T21:51:37.1559625Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-01-11T21:51:37.1589955Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-01-11T21:51:37.1805569Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-01-11T21:51:37.1843910Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-01-11T21:51:37.2061851Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2026-01-11T21:51:37.2096486Z ##[endgroup]
2026-01-11T21:51:37.2097432Z ##[group]Fetching the repository
2026-01-11T21:51:37.2105396Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +d6103c6d30f2addac431ce7c6868c8d4d64f6769:refs/remotes/origin/main
2026-01-11T21:51:38.2679790Z From https://github.com/mujahidkhanofficial/AndalusianCastle
2026-01-11T21:51:38.2680753Z  * [new ref]         d6103c6d30f2addac431ce7c6868c8d4d64f6769 -> origin/main
2026-01-11T21:51:38.2713141Z ##[endgroup]
2026-01-11T21:51:38.2713797Z ##[group]Determining the checkout info
2026-01-11T21:51:38.2715891Z ##[endgroup]
2026-01-11T21:51:38.2721427Z [command]/usr/bin/git sparse-checkout disable
2026-01-11T21:51:38.2763944Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2026-01-11T21:51:38.2788987Z ##[group]Checking out the ref
2026-01-11T21:51:38.2792844Z [command]/usr/bin/git checkout --progress --force -B main refs/remotes/origin/main
2026-01-11T21:51:38.3793321Z Switched to a new branch 'main'
2026-01-11T21:51:38.3794565Z branch 'main' set up to track 'origin/main'.
2026-01-11T21:51:38.3821722Z ##[endgroup]
2026-01-11T21:51:38.3860126Z [command]/usr/bin/git log -1 --format=%H
2026-01-11T21:51:38.3883204Z d6103c6d30f2addac431ce7c6868c8d4d64f6769
2026-01-11T21:51:38.4112300Z ##[group]Run actions/setup-node@v4
2026-01-11T21:51:38.4112601Z with:
2026-01-11T21:51:38.4112775Z   node-version: 20
2026-01-11T21:51:38.4112957Z   cache: npm
2026-01-11T21:51:38.4113129Z   always-auth: false
2026-01-11T21:51:38.4113320Z   check-latest: false
2026-01-11T21:51:38.4113832Z   token: ***
2026-01-11T21:51:38.4114003Z ##[endgroup]
2026-01-11T21:51:38.6276649Z Found in cache @ /opt/hostedtoolcache/node/20.19.6/x64
2026-01-11T21:51:38.6281151Z ##[group]Environment details
2026-01-11T21:51:40.7288863Z node: v20.19.6
2026-01-11T21:51:40.7289377Z npm: 10.8.2
2026-01-11T21:51:40.7289674Z yarn: 1.22.22
2026-01-11T21:51:40.7291100Z ##[endgroup]
2026-01-11T21:51:40.7316052Z [command]/opt/hostedtoolcache/node/20.19.6/x64/bin/npm config get cache
2026-01-11T21:51:40.9744788Z /home/runner/.npm
2026-01-11T21:51:41.0724547Z Cache hit for: node-cache-Linux-x64-npm-8f2c909b41928a8e22ce8b357299ef2d8692548c977b68ca7939308220768d76
2026-01-11T21:51:41.4795548Z Received 76530458 of 76530458 (100.0%), 193.1 MBs/sec
2026-01-11T21:51:41.4796657Z Cache Size: ~73 MB (76530458 B)
2026-01-11T21:51:41.4826771Z [command]/usr/bin/tar -xf /home/runner/work/_temp/14f159ca-9a37-44fc-b7d0-2cd706de5bd6/cache.tzst -P -C /home/runner/work/AndalusianCastle/AndalusianCastle --use-compress-program unzstd
2026-01-11T21:51:41.8833889Z Cache restored successfully
2026-01-11T21:51:41.8984445Z Cache restored from key: node-cache-Linux-x64-npm-8f2c909b41928a8e22ce8b357299ef2d8692548c977b68ca7939308220768d76
2026-01-11T21:51:41.9164017Z ##[group]Run npm ci
2026-01-11T21:51:41.9164306Z [36;1mnpm ci[0m
2026-01-11T21:51:41.9209956Z shell: /usr/bin/bash -e {0}
2026-01-11T21:51:41.9210224Z ##[endgroup]
2026-01-11T21:51:48.0441613Z npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
2026-01-11T21:51:48.1125379Z npm warn deprecated stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
2026-01-11T21:51:48.1690918Z npm warn deprecated @babel/plugin-proposal-private-methods@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-methods instead.
2026-01-11T21:51:48.1694667Z npm warn deprecated @babel/plugin-proposal-nullish-coalescing-operator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-nullish-coalescing-operator instead.
2026-01-11T21:51:48.1698519Z npm warn deprecated @babel/plugin-proposal-numeric-separator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-numeric-separator instead.
2026-01-11T21:51:48.1701976Z npm warn deprecated @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead.
2026-01-11T21:51:48.2512567Z npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
2026-01-11T21:51:48.2515975Z npm warn deprecated rimraf@2.6.3: Rimraf versions prior to v4 are no longer supported
2026-01-11T21:51:48.2778026Z npm warn deprecated rollup-plugin-terser@7.0.2: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-terser
2026-01-11T21:51:48.3210179Z npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
2026-01-11T21:51:48.3416995Z npm warn deprecated whatwg-encoding@1.0.5: Use @exodus/bytes instead for a more spec-conformant and faster implementation
2026-01-11T21:51:48.3497166Z npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
2026-01-11T21:51:48.3788682Z npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
2026-01-11T21:51:48.3889822Z npm warn deprecated @babel/plugin-proposal-optional-chaining@7.21.0: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-chaining instead.
2026-01-11T21:51:48.4007486Z npm warn deprecated @babel/plugin-proposal-private-property-in-object@7.21.11: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-property-in-object instead.
2026-01-11T21:51:48.5357882Z npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
2026-01-11T21:51:48.5513810Z npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
2026-01-11T21:51:48.5948398Z npm warn deprecated domexception@2.0.1: Use your platform's native DOMException instead
2026-01-11T21:51:48.6196526Z npm warn deprecated w3c-hr-time@1.0.2: Use your platform's native performance.now() and performance.timeOrigin.
2026-01-11T21:51:48.6665598Z npm warn deprecated q@1.5.1: You or someone you depend on is using Q, the JavaScript Promise library that gave JavaScript developers strong feelings about promises. They can almost certainly migrate to the native JavaScript promise now. Thank you literally everyone for joining me in this bet against the odds. Be excellent to each other.
2026-01-11T21:51:48.6667013Z npm warn deprecated
2026-01-11T21:51:48.6667537Z npm warn deprecated (For a CapTP with native promises, see @endo/eventual-send and @endo/captp)
2026-01-11T21:51:48.7018606Z npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
2026-01-11T21:51:49.2002198Z npm warn deprecated workbox-cacheable-response@6.6.0: workbox-background-sync@6.6.0
2026-01-11T21:51:49.2964740Z npm warn deprecated source-map@0.8.0-beta.0: The work that was done in this beta branch won't be included in future versions
2026-01-11T21:51:49.3012170Z npm warn deprecated workbox-google-analytics@6.6.0: It is not compatible with newer versions of GA starting with v4, as long as you are using GAv3 it should be ok, but the package is not longer being maintained
2026-01-11T21:51:49.9675070Z npm warn deprecated svgo@1.3.2: This SVGO version is no longer supported. Upgrade to v2.x.x.
2026-01-11T21:51:51.7857666Z npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
2026-01-11T21:51:54.5370656Z 
2026-01-11T21:51:54.5371352Z added 1751 packages, and audited 1752 packages in 13s
2026-01-11T21:51:54.5371796Z 
2026-01-11T21:51:54.5372051Z 293 packages are looking for funding
2026-01-11T21:51:54.5372534Z   run `npm fund` for details
2026-01-11T21:51:54.5872721Z 
2026-01-11T21:51:54.5873505Z 21 vulnerabilities (7 low, 3 moderate, 11 high)
2026-01-11T21:51:54.5874035Z 
2026-01-11T21:51:54.5874429Z To address all issues (including breaking changes), run:
2026-01-11T21:51:54.5874869Z   npm audit fix --force
2026-01-11T21:51:54.5875061Z 
2026-01-11T21:51:54.5875470Z Run `npm audit` for details.
2026-01-11T21:51:54.6562450Z ##[group]Run npm run build
2026-01-11T21:51:54.6562722Z [36;1mnpm run build[0m
2026-01-11T21:51:54.6598191Z shell: /usr/bin/bash -e {0}
2026-01-11T21:51:54.6598431Z ##[endgroup]
2026-01-11T21:51:54.7704004Z 
2026-01-11T21:51:54.7704676Z > andalusian-castle@1.0.0 prebuild
2026-01-11T21:51:54.7705533Z > npm run sitemap
2026-01-11T21:51:54.7705782Z 
2026-01-11T21:51:54.8791835Z 
2026-01-11T21:51:54.8793219Z > andalusian-castle@1.0.0 sitemap
2026-01-11T21:51:54.8793836Z > node scripts/generate-sitemap.js
2026-01-11T21:51:54.8794159Z 
2026-01-11T21:51:54.9050993Z ✅ Sitemap generated: /home/runner/work/AndalusianCastle/AndalusianCastle/public/sitemap.xml
2026-01-11T21:51:54.9054804Z    8 URLs included
2026-01-11T21:51:54.9143970Z 
2026-01-11T21:51:54.9144308Z > andalusian-castle@1.0.0 build
2026-01-11T21:51:54.9144788Z > react-scripts build
2026-01-11T21:51:54.9145025Z 
2026-01-11T21:51:55.8682153Z Creating an optimized production build...
2026-01-11T21:52:06.7470714Z Compiled successfully.
2026-01-11T21:52:06.7471042Z 
2026-01-11T21:52:06.7471249Z File sizes after gzip:
2026-01-11T21:52:06.7471912Z 
2026-01-11T21:52:06.7600316Z   56.02 kB  build/static/js/main.93dc06e0.js
2026-01-11T21:52:06.7601034Z   7.96 kB   build/static/js/321.20d14187.chunk.js
2026-01-11T21:52:06.7601970Z   5.78 kB   build/static/js/768.59fe7aa4.chunk.js
2026-01-11T21:52:06.7602729Z   5.73 kB   build/static/js/787.4bce3a85.chunk.js
2026-01-11T21:52:06.7603500Z   5.02 kB   build/static/js/940.b4977837.chunk.js
2026-01-11T21:52:06.7604216Z   4.94 kB   build/static/js/651.d9ebee7e.chunk.js
2026-01-11T21:52:06.7604653Z   4.37 kB   build/static/css/main.bd435432.css
2026-01-11T21:52:06.7605103Z   3.92 kB   build/static/js/399.f3f11522.chunk.js
2026-01-11T21:52:06.7605924Z   3.67 kB   build/static/js/118.00f38f6f.chunk.js
2026-01-11T21:52:06.7606342Z 
2026-01-11T21:52:06.7606760Z The project was built assuming it is hosted at /.
2026-01-11T21:52:06.7607751Z You can control this with the homepage field in your package.json.
2026-01-11T21:52:06.7608357Z 
2026-01-11T21:52:06.7608740Z The build folder is ready to be deployed.
2026-01-11T21:52:06.7609526Z You may serve it with a static server:
2026-01-11T21:52:06.7609942Z 
2026-01-11T21:52:06.7610706Z   npm install -g serve
2026-01-11T21:52:06.7611465Z   serve -s build
2026-01-11T21:52:06.7611855Z 
2026-01-11T21:52:06.7612625Z Find out more about deployment here:
2026-01-11T21:52:06.7613108Z 
2026-01-11T21:52:06.7613616Z   https://cra.link/deployment
2026-01-11T21:52:06.7613922Z 
2026-01-11T21:52:06.8680698Z ##[group]Run treosh/lighthouse-ci-action@v11
2026-01-11T21:52:06.8681002Z with:
2026-01-11T21:52:06.8681191Z   configPath: ./lighthouse.config.js
2026-01-11T21:52:06.8681454Z   uploadArtifacts: true
2026-01-11T21:52:06.8681680Z   temporaryPublicStorage: true
2026-01-11T21:52:06.8681921Z   artifactName: lighthouse-results
2026-01-11T21:52:06.8682163Z ##[endgroup]
2026-01-11T21:52:07.4132912Z /home/runner/work/_actions/treosh/lighthouse-ci-action/v11/node_modules/@lhci/cli/src/cli.js
2026-01-11T21:52:07.4139382Z ##[group]Action config
2026-01-11T21:52:07.4149371Z Input args: {
2026-01-11T21:52:07.4149716Z   "urls": [],
2026-01-11T21:52:07.4149997Z   "runs": 3,
2026-01-11T21:52:07.4150335Z   "staticDistDir": null,
2026-01-11T21:52:07.4150711Z   "budgetPath": "",
2026-01-11T21:52:07.4151459Z   "configPath": "/home/runner/work/AndalusianCastle/AndalusianCastle/lighthouse.config.js",
2026-01-11T21:52:07.4152229Z   "serverBaseUrl": "",
2026-01-11T21:52:07.4152578Z   "serverToken": "",
2026-01-11T21:52:07.4153000Z   "temporaryPublicStorage": true,
2026-01-11T21:52:07.4153277Z   "uploadArtifacts": true,
2026-01-11T21:52:07.4153504Z   "uploadExtraArgs": "",
2026-01-11T21:52:07.4153763Z   "basicAuthUsername": "lighthouse",
2026-01-11T21:52:07.4154035Z   "basicAuthPassword": "",
2026-01-11T21:52:07.4154302Z   "artifactName": "lighthouse-results"
2026-01-11T21:52:07.4154555Z }
2026-01-11T21:52:07.4154869Z ##[endgroup]
2026-01-11T21:52:07.4155172Z ##[group]Collecting
2026-01-11T21:52:37.7347076Z Started a web server with "npm run serve"...
2026-01-11T21:52:37.7348560Z WARNING: Timed out waiting for the server to start listening.
2026-01-11T21:52:37.7349900Z          Ensure the server prints a pattern that matches /ready on/i when it is ready.
2026-01-11T21:52:37.7350834Z 
2026-01-11T21:52:37.7352046Z Server Output:
2026-01-11T21:52:37.7352750Z Running Lighthouse 3 time(s) on http://localhost:3000/
2026-01-11T21:52:37.7353303Z 
2026-01-11T21:52:37.7353995Z > andalusian-castle@1.0.0 serve
2026-01-11T21:52:37.7354509Z > serve -s build -l 3000
2026-01-11T21:52:37.7354777Z 
2026-01-11T21:52:37.7355097Z  INFO  Accepting connections at http://localhost:3000
2026-01-11T21:52:37.7355833Z 
2026-01-11T21:52:37.7355844Z 
2026-01-11T21:53:09.6164192Z Run #1...done.
2026-01-11T21:53:34.8969835Z Run #2...done.
2026-01-11T21:53:59.4613019Z Run #3...done.
2026-01-11T21:53:59.4615830Z Running Lighthouse 3 time(s) on http://localhost:3000/#rooms
2026-01-11T21:54:23.9784900Z Run #1...done.
2026-01-11T21:54:48.6150146Z Run #2...done.
2026-01-11T21:55:13.1291058Z Run #3...done.
2026-01-11T21:55:13.1291766Z Running Lighthouse 3 time(s) on http://localhost:3000/#amenities
2026-01-11T21:55:37.6549855Z Run #1...done.
2026-01-11T21:56:02.9214801Z Run #2...done.
2026-01-11T21:56:28.2515562Z Run #3...done.
2026-01-11T21:56:28.2516288Z Running Lighthouse 3 time(s) on http://localhost:3000/#dining
2026-01-11T21:56:53.0791626Z Run #1...done.
2026-01-11T21:57:18.2061794Z Run #2...done.
2026-01-11T21:57:43.0503709Z Run #3...done.
2026-01-11T21:57:43.0504279Z Running Lighthouse 3 time(s) on http://localhost:3000/#gallery
2026-01-11T21:58:08.0429233Z Run #1...done.
2026-01-11T21:58:32.5541736Z Run #2...done.
2026-01-11T21:58:57.8116782Z Run #3...done.
2026-01-11T21:58:57.8117366Z Running Lighthouse 3 time(s) on http://localhost:3000/#location
2026-01-11T21:59:22.4610957Z Run #1...done.
2026-01-11T21:59:47.8832984Z Run #2...done.
2026-01-11T22:00:12.4171823Z Run #3...done.
2026-01-11T22:00:12.4501818Z Done running Lighthouse!
2026-01-11T22:00:12.4616576Z ##[endgroup]
2026-01-11T22:00:12.4623779Z ##[group]Asserting
2026-01-11T22:00:12.8505810Z Checking assertions against 1 URL(s), 18 total run(s)
2026-01-11T22:00:12.8506586Z 
2026-01-11T22:00:12.8579896Z 29 result(s) for [1mhttp://localhost:3000/[0m :
2026-01-11T22:00:12.8580458Z 
2026-01-11T22:00:12.8584445Z   [31m✘[0m  [1maria-allowed-role[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8585596Z        Values assigned to `role=""` are not valid ARIA roles.
2026-01-11T22:00:12.8587000Z        https://dequeuniversity.com/rules/axe/4.8/aria-allowed-role
2026-01-11T22:00:12.8587538Z 
2026-01-11T22:00:12.8587883Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8588377Z            found: [31m0[0m
2026-01-11T22:00:12.8589115Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8589593Z 
2026-01-11T22:00:12.8589655Z 
2026-01-11T22:00:12.8590359Z   [31m✘[0m  [1mcategories[0m.performance failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8591233Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8591815Z            found: [31m0.6[0m
2026-01-11T22:00:12.8592869Z       [2mall values: 0.45, 0.54, 0.58, 0.56, 0.55, 0.6, 0.56, 0.57, 0.58, 0.56, 0.59, 0.56, 0.58, 0.55, 0.56, 0.56, 0.54, 0.57[0m
2026-01-11T22:00:12.8593511Z 
2026-01-11T22:00:12.8593521Z 
2026-01-11T22:00:12.8594041Z   [31m✘[0m  [1mcolor-contrast[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8595020Z        Background and foreground colors do not have a sufficient contrast ratio.
2026-01-11T22:00:12.8596197Z        https://dequeuniversity.com/rules/axe/4.8/color-contrast
2026-01-11T22:00:12.8596671Z 
2026-01-11T22:00:12.8596986Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8597500Z            found: [31m0[0m
2026-01-11T22:00:12.8598282Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8598749Z 
2026-01-11T22:00:12.8598759Z 
2026-01-11T22:00:12.8599332Z   [31m✘[0m  [1mduplicate-id-aria[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8599990Z        ARIA IDs are unique
2026-01-11T22:00:12.8600534Z        https://dequeuniversity.com/rules/axe/4.8/duplicate-id-aria
2026-01-11T22:00:12.8600939Z 
2026-01-11T22:00:12.8601187Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8601574Z            found: [31m0[0m
2026-01-11T22:00:12.8602224Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8602606Z 
2026-01-11T22:00:12.8602623Z 
2026-01-11T22:00:12.8603096Z   [31m✘[0m  [1mimage-redundant-alt[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8603880Z        Image elements have `[alt]` attributes that are redundant text.
2026-01-11T22:00:12.8604589Z        https://dequeuniversity.com/rules/axe/4.8/image-redundant-alt
2026-01-11T22:00:12.8605004Z 
2026-01-11T22:00:12.8605423Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8605871Z            found: [31m0[0m
2026-01-11T22:00:12.8606281Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8606799Z 
2026-01-11T22:00:12.8606805Z 
2026-01-11T22:00:12.8607140Z   [31m✘[0m  [1minstallable-manifest[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8607704Z        Web app manifest or service worker do not meet the installability requirements
2026-01-11T22:00:12.8608273Z        https://developer.chrome.com/docs/lighthouse/pwa/installable-manifest/
2026-01-11T22:00:12.8608586Z 
2026-01-11T22:00:12.8608734Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8608994Z            found: [31m0[0m
2026-01-11T22:00:12.8609374Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8609616Z 
2026-01-11T22:00:12.8609621Z 
2026-01-11T22:00:12.8609973Z   [31m✘[0m  [1mlabel-content-name-mismatch[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8610531Z        Elements with visible text labels do not have matching accessible names.
2026-01-11T22:00:12.8611057Z        https://dequeuniversity.com/rules/axe/4.8/label-content-name-mismatch
2026-01-11T22:00:12.8611359Z 
2026-01-11T22:00:12.8611491Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8611746Z            found: [31m0[0m
2026-01-11T22:00:12.8612122Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8612361Z 
2026-01-11T22:00:12.8612366Z 
2026-01-11T22:00:12.8612638Z   [31m✘[0m  [1mmaskable-icon[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8613175Z        Manifest doesn't have a maskable icon
2026-01-11T22:00:12.8613614Z        https://developer.chrome.com/docs/lighthouse/pwa/maskable-icon-audit/
2026-01-11T22:00:12.8613914Z 
2026-01-11T22:00:12.8614103Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8614363Z            found: [31m0[0m
2026-01-11T22:00:12.8614741Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8614982Z 
2026-01-11T22:00:12.8614987Z 
2026-01-11T22:00:12.8615569Z   [31m✘[0m  [1mno-vulnerable-libraries[0m failure for [1mauditRan[0m assertion
2026-01-11T22:00:12.8616132Z        "no-vulnerable-libraries" is not a known audit.
2026-01-11T22:00:12.8616416Z 
2026-01-11T22:00:12.8616595Z         expected: >=[32m1[0m
2026-01-11T22:00:12.8616948Z            found: [31m0[0m
2026-01-11T22:00:12.8617527Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8617844Z 
2026-01-11T22:00:12.8617848Z 
2026-01-11T22:00:12.8618253Z   [31m✘[0m  [1mnon-composited-animations[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8618764Z        Avoid non-composited animations
2026-01-11T22:00:12.8619409Z        https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/
2026-01-11T22:00:12.8619793Z 
2026-01-11T22:00:12.8619997Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8620297Z            found: [31m0[0m
2026-01-11T22:00:12.8620839Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8621181Z 
2026-01-11T22:00:12.8621193Z 
2026-01-11T22:00:12.8621472Z   [31m✘[0m  [1mskip-link[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8621961Z        Skip links are not focusable.
2026-01-11T22:00:12.8622414Z        https://dequeuniversity.com/rules/axe/4.8/skip-link
2026-01-11T22:00:12.8622681Z 
2026-01-11T22:00:12.8622852Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8623246Z            found: [31m0[0m
2026-01-11T22:00:12.8623786Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8624184Z 
2026-01-11T22:00:12.8624189Z 
2026-01-11T22:00:12.8624502Z   [31m✘[0m  [1msplash-screen[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8625102Z        Is not configured for a custom splash screen
2026-01-11T22:00:12.8625875Z        https://developer.chrome.com/docs/lighthouse/pwa/splash-screen/
2026-01-11T22:00:12.8626186Z 
2026-01-11T22:00:12.8626392Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8626803Z            found: [31m0[0m
2026-01-11T22:00:12.8627534Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8627859Z 
2026-01-11T22:00:12.8627864Z 
2026-01-11T22:00:12.8628149Z   [31m✘[0m  [1mtarget-size[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8628748Z        Touch targets have sufficient size and spacing.
2026-01-11T22:00:12.8629241Z        https://dequeuniversity.com/rules/axe/4.8/target-size
2026-01-11T22:00:12.8629512Z 
2026-01-11T22:00:12.8629751Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8630123Z            found: [31m0[0m
2026-01-11T22:00:12.8630595Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8630887Z 
2026-01-11T22:00:12.8630891Z 
2026-01-11T22:00:12.8631252Z   [31m✘[0m  [1mtotal-byte-weight[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8631761Z        Avoid enormous network payloads
2026-01-11T22:00:12.8632297Z        https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/
2026-01-11T22:00:12.8632658Z 
2026-01-11T22:00:12.8632961Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8633300Z            found: [31m0.5[0m
2026-01-11T22:00:12.8633894Z       [2mall values: 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5[0m
2026-01-11T22:00:12.8634319Z 
2026-01-11T22:00:12.8634323Z 
2026-01-11T22:00:12.8634781Z   [31m✘[0m  [1munsized-images[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8635581Z        Image elements do not have explicit `width` and `height`
2026-01-11T22:00:12.8636130Z        https://web.dev/articles/optimize-cls#images_without_dimensions
2026-01-11T22:00:12.8636547Z 
2026-01-11T22:00:12.8636791Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8637124Z            found: [31m0.5[0m
2026-01-11T22:00:12.8637694Z       [2mall values: 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5[0m
2026-01-11T22:00:12.8638144Z 
2026-01-11T22:00:12.8638149Z 
2026-01-11T22:00:12.8638520Z   [31m✘[0m  [1muses-responsive-images[0m failure for [1mmaxLength[0m assertion
2026-01-11T22:00:12.8639000Z        Properly size images
2026-01-11T22:00:12.8660260Z        https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/
2026-01-11T22:00:12.8660834Z 
2026-01-11T22:00:12.8661136Z         expected: <=[32m0[0m
2026-01-11T22:00:12.8661595Z            found: [31m17[0m
2026-01-11T22:00:12.8662335Z       [2mall values: 18, 18, 18, 18, 18, 18, 18, 17, 18, 18, 18, 18, 18, 18, 18, 17, 18, 18[0m
2026-01-11T22:00:12.8662794Z 
2026-01-11T22:00:12.8662803Z 
2026-01-11T22:00:12.8663291Z   [31m✘[0m  [1mvideo-caption[0m failure for [1mminScore[0m assertion
2026-01-11T22:00:12.8664143Z        `<video>` elements contain a `<track>` element with `[kind="captions"]`
2026-01-11T22:00:12.8664900Z        https://dequeuniversity.com/rules/axe/4.8/video-caption
2026-01-11T22:00:12.8665541Z 
2026-01-11T22:00:12.8665851Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8666412Z            found: [31m0[0m
2026-01-11T22:00:12.8667176Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8667603Z 
2026-01-11T22:00:12.8667613Z 
2026-01-11T22:00:12.8668143Z   ⚠️  [1mbootup-time[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8668766Z        JavaScript execution time
2026-01-11T22:00:12.8669537Z        https://developer.chrome.com/docs/lighthouse/performance/bootup-time/
2026-01-11T22:00:12.8670098Z 
2026-01-11T22:00:12.8670411Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8670889Z            found: [31m0[0m
2026-01-11T22:00:12.8671621Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8672081Z 
2026-01-11T22:00:12.8672101Z 
2026-01-11T22:00:12.8672524Z   ⚠️  [1mcsp-xss[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8673203Z        Ensure CSP is effective against XSS attacks
2026-01-11T22:00:12.8673979Z        https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/
2026-01-11T22:00:12.8674679Z 
2026-01-11T22:00:12.8674868Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8675154Z            found: [31m0[0m
2026-01-11T22:00:12.8675835Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8676091Z 
2026-01-11T22:00:12.8676096Z 
2026-01-11T22:00:12.8676348Z   ⚠️  [1mdom-size[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8676698Z        Avoids an excessive DOM size
2026-01-11T22:00:12.8677374Z        https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
2026-01-11T22:00:12.8677903Z 
2026-01-11T22:00:12.8678046Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8678308Z            found: [31m0[0m
2026-01-11T22:00:12.8678704Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8678952Z 
2026-01-11T22:00:12.8678957Z 
2026-01-11T22:00:12.8679268Z   ⚠️  [1mfirst-meaningful-paint[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8679651Z        First Meaningful Paint
2026-01-11T22:00:12.8680090Z        https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint/
2026-01-11T22:00:12.8680438Z 
2026-01-11T22:00:12.8680573Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8680858Z            found: [31m0.25[0m
2026-01-11T22:00:12.8681561Z       [2mall values: 0.05, 0.11, 0.25, 0.24, 0.2, 0.24, 0.25, 0.1, 0.13, 0.2, 0.14, 0.18, 0.18, 0.22, 0.11, 0.23, 0.12, 0.25[0m
2026-01-11T22:00:12.8681923Z 
2026-01-11T22:00:12.8681972Z 
2026-01-11T22:00:12.8682229Z   ⚠️  [1mfocus-visible[0m warning for [1mauditRan[0m assertion
2026-01-11T22:00:12.8682609Z        "focus-visible" is not a known audit.
2026-01-11T22:00:12.8682791Z 
2026-01-11T22:00:12.8682929Z         expected: >=[32m1[0m
2026-01-11T22:00:12.8683177Z            found: [31m0[0m
2026-01-11T22:00:12.8683564Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8683821Z 
2026-01-11T22:00:12.8683826Z 
2026-01-11T22:00:12.8684121Z   ⚠️  [1mmainthread-work-breakdown[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8684514Z        Minimize main-thread work
2026-01-11T22:00:12.8684975Z        https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/
2026-01-11T22:00:12.8685534Z 
2026-01-11T22:00:12.8685697Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8685974Z            found: [31m0[0m
2026-01-11T22:00:12.8686374Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8686626Z 
2026-01-11T22:00:12.8686630Z 
2026-01-11T22:00:12.8686905Z   ⚠️  [1mmax-potential-fid[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8687293Z        Max Potential First Input Delay
2026-01-11T22:00:12.8687785Z        https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/
2026-01-11T22:00:12.8688172Z 
2026-01-11T22:00:12.8688318Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8688600Z            found: [31m0.28[0m
2026-01-11T22:00:12.8689630Z       [2mall values: 0.22, 0.25, 0.16, 0.16, 0.19, 0.24, 0.2, 0.24, 0.23, 0.25, 0.24, 0.22, 0.25, 0.18, 0.23, 0.28, 0.23, 0.15[0m
2026-01-11T22:00:12.8690256Z 
2026-01-11T22:00:12.8690265Z 
2026-01-11T22:00:12.8690734Z   ⚠️  [1mmodern-image-formats[0m warning for [1mmaxLength[0m assertion
2026-01-11T22:00:12.8691146Z        Serve images in next-gen formats
2026-01-11T22:00:12.8691581Z        https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/
2026-01-11T22:00:12.8691902Z 
2026-01-11T22:00:12.8692041Z         expected: <=[32m0[0m
2026-01-11T22:00:12.8692299Z            found: [31m1[0m
2026-01-11T22:00:12.8692695Z       [2mall values: 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1[0m
2026-01-11T22:00:12.8692943Z 
2026-01-11T22:00:12.8692948Z 
2026-01-11T22:00:12.8693268Z   ⚠️  [1mrender-blocking-resources[0m warning for [1mmaxLength[0m assertion
2026-01-11T22:00:12.8693895Z        Eliminate render-blocking resources
2026-01-11T22:00:12.8694387Z        https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/
2026-01-11T22:00:12.8694754Z 
2026-01-11T22:00:12.8694894Z         expected: <=[32m0[0m
2026-01-11T22:00:12.8695155Z            found: [31m1[0m
2026-01-11T22:00:12.8695828Z       [2mall values: 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1[0m
2026-01-11T22:00:12.8696081Z 
2026-01-11T22:00:12.8696086Z 
2026-01-11T22:00:12.8696381Z   ⚠️  [1mserver-response-time[0m warning for [1mminScore[0m assertion
2026-01-11T22:00:12.8696780Z        Initial server response time was short
2026-01-11T22:00:12.8697240Z        https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/
2026-01-11T22:00:12.8697569Z 
2026-01-11T22:00:12.8697704Z         expected: >=[32m0.9[0m
2026-01-11T22:00:12.8697963Z            found: [31m0[0m
2026-01-11T22:00:12.8698345Z       [2mall values: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0[0m
2026-01-11T22:00:12.8698601Z 
2026-01-11T22:00:12.8698605Z 
2026-01-11T22:00:12.8698908Z   ⚠️  [1mtotal-blocking-time[0m warning for [1mmaxNumericValue[0m assertion
2026-01-11T22:00:12.8699297Z        Total Blocking Time
2026-01-11T22:00:12.8699769Z        https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/
2026-01-11T22:00:12.8700306Z 
2026-01-11T22:00:12.8700457Z         expected: <=[32m300[0m
2026-01-11T22:00:12.8700775Z            found: [31m500.63699999999983[0m
2026-01-11T22:00:12.8702520Z       [2mall values: 627.3219999999999, 577.8190000000004, 568.0420000000001, 559.2900000000005, 574.7170000000001, 508.626, 559.5569999999998, 505.3479999999996, 533.5140000000002, 547.7749999999997, 509.9630000000001, 557.8929999999997, 519.7880000000005, 567.36399999994, 500.63699999999983, 538.3949999999999, 592.3399999999999, 534.2950000000001[0m
2026-01-11T22:00:12.8704140Z 
2026-01-11T22:00:12.8704149Z 
2026-01-11T22:00:12.8704729Z   ⚠️  [1muses-long-cache-ttl[0m warning for [1mmaxLength[0m assertion
2026-01-11T22:00:12.8705689Z        Serve static assets with an efficient cache policy
2026-01-11T22:00:12.8706577Z        https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/
2026-01-11T22:00:12.8707194Z 
2026-01-11T22:00:12.8707509Z         expected: <=[32m0[0m
2026-01-11T22:00:12.8708020Z            found: [31m33[0m
2026-01-11T22:00:12.8708894Z       [2mall values: 35, 34, 34, 34, 34, 34, 34, 33, 34, 34, 34, 34, 34, 35, 34, 33, 34, 34[0m
2026-01-11T22:00:12.8709191Z 
2026-01-11T22:00:12.8709372Z Assertion failed. Exiting with status code 1.
2026-01-11T22:00:12.8709893Z ##[endgroup]
2026-01-11T22:00:12.8710217Z ##[group]Uploading
2026-01-11T22:00:12.8735849Z Artifact name is valid!
2026-01-11T22:00:12.8736413Z Root directory input is valid!
2026-01-11T22:00:12.9851300Z Beginning upload of artifact content to blob storage
2026-01-11T22:00:13.6899180Z Uploaded bytes 8388608
2026-01-11T22:00:14.1106377Z Uploaded bytes 16777216
2026-01-11T22:00:14.1958393Z Uploaded bytes 18301733
2026-01-11T22:00:14.2137742Z Finished uploading artifact content to blob storage!
2026-01-11T22:00:14.2141189Z SHA256 hash of uploaded artifact zip is 9b080723f6c590b7c322288baaf0696a7416b0a499757b5dbd1b7ed09fae0db6
2026-01-11T22:00:14.2143768Z Finalizing artifact upload
2026-01-11T22:00:14.3357102Z Artifact lighthouse-results.zip successfully finalized. Artifact ID 5091828169
2026-01-11T22:00:15.8823536Z Uploading median LHR of http://localhost:3000/...success!
2026-01-11T22:00:15.8824571Z Open the report at https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1768168815612-11585.report.html
2026-01-11T22:00:15.8876842Z No GitHub token set, skipping GitHub status check.
2026-01-11T22:00:16.2855574Z Dumping 18 reports to disk at /home/runner/work/AndalusianCastle/AndalusianCastle/.lighthouseci...
2026-01-11T22:00:16.9525966Z Done writing reports to disk.
2026-01-11T22:00:16.9679437Z ##[endgroup]
2026-01-11T22:00:16.9808135Z ##[error]29 results for http://localhost:3000/
Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1768168815612-11585.report.html

❌ `aria-allowed-role` failure for `minScore` assertion (Values assigned to `role=""` are not valid ARIA roles.: https://dequeuniversity.com/rules/axe/4.8/aria-allowed-role )
Expected >= 0.9, but found 0

❌ `categories.performance` failure for `minScore` assertion
Expected >= 0.9, but found 0.6

❌ `color-contrast` failure for `minScore` assertion (Background and foreground colors do not have a sufficient contrast ratio.: https://dequeuniversity.com/rules/axe/4.8/color-contrast )
Expected >= 0.9, but found 0

❌ `duplicate-id-aria` failure for `minScore` assertion (ARIA IDs are unique: https://dequeuniversity.com/rules/axe/4.8/duplicate-id-aria )
Expected >= 0.9, but found 0

❌ `image-redundant-alt` failure for `minScore` assertion (Image elements have `[alt]` attributes that are redundant text.: https://dequeuniversity.com/rules/axe/4.8/image-redundant-alt )
Expected >= 0.9, but found 0

❌ `installable-manifest` failure for `minScore` assertion (Web app manifest or service worker do not meet the installability requirements: https://developer.chrome.com/docs/lighthouse/pwa/installable-manifest/ )
Expected >= 0.9, but found 0

❌ `label-content-name-mismatch` failure for `minScore` assertion (Elements with visible text labels do not have matching accessible names.: https://dequeuniversity.com/rules/axe/4.8/label-content-name-mismatch )
Expected >= 0.9, but found 0

❌ `maskable-icon` failure for `minScore` assertion (Manifest doesn't have a maskable icon: https://developer.chrome.com/docs/lighthouse/pwa/maskable-icon-audit/ )
Expected >= 0.9, but found 0

❌ `no-vulnerable-libraries` failure for `auditRan` assertion
Expected >= 1, but found 0

❌ `non-composited-animations` failure for `minScore` assertion (Avoid non-composited animations: https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/ )
Expected >= 0.9, but found 0

❌ `skip-link` failure for `minScore` assertion (Skip links are not focusable.: https://dequeuniversity.com/rules/axe/4.8/skip-link )
Expected >= 0.9, but found 0

❌ `splash-screen` failure for `minScore` assertion (Is not configured for a custom splash screen: https://developer.chrome.com/docs/lighthouse/pwa/splash-screen/ )
Expected >= 0.9, but found 0

❌ `target-size` failure for `minScore` assertion (Touch targets have sufficient size and spacing.: https://dequeuniversity.com/rules/axe/4.8/target-size )
Expected >= 0.9, but found 0

❌ `total-byte-weight` failure for `minScore` assertion (Avoid enormous network payloads: https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/ )
Expected >= 0.9, but found 0.5

❌ `unsized-images` failure for `minScore` assertion (Image elements do not have explicit `width` and `height`: https://web.dev/articles/optimize-cls#images_without_dimensions )
Expected >= 0.9, but found 0.5

❌ `uses-responsive-images` failure for `maxLength` assertion (Properly size images: https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/ )
Expected <= 0, but found 17

❌ `video-caption` failure for `minScore` assertion (`<video>` elements contain a `<track>` element with `[kind="captions"]`: https://dequeuniversity.com/rules/axe/4.8/video-caption )
Expected >= 0.9, but found 0

⚠️ `bootup-time` warning for `minScore` assertion (JavaScript execution time: https://developer.chrome.com/docs/lighthouse/performance/bootup-time/ )
Expected >= 0.9, but found 0

⚠️ `csp-xss` warning for `minScore` assertion (Ensure CSP is effective against XSS attacks: https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/ )
Expected >= 0.9, but found 0

⚠️ `dom-size` warning for `minScore` assertion (Avoids an excessive DOM size: https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations )
Expected >= 0.9, but found 0

⚠️ `first-meaningful-paint` warning for `minScore` assertion (First Meaningful Paint: https://dev
2026-01-11T22:00:16.9934230Z Post job cleanup.
2026-01-11T22:00:17.0883518Z [command]/usr/bin/git version
2026-01-11T22:00:17.0930131Z git version 2.52.0
2026-01-11T22:00:17.0975184Z Temporarily overriding HOME='/home/runner/work/_temp/9d2142c8-2480-439d-8f4d-08246caeb042' before making global git config changes
2026-01-11T22:00:17.0976309Z Adding repository directory to the temporary git global config as a safe directory
2026-01-11T22:00:17.0981128Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/AndalusianCastle/AndalusianCastle
2026-01-11T22:00:17.1020032Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-01-11T22:00:17.1053631Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-01-11T22:00:17.1308420Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-01-11T22:00:17.1333358Z http.https://github.com/.extraheader
2026-01-11T22:00:17.1348138Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2026-01-11T22:00:17.1382682Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-01-11T22:00:17.1627501Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-01-11T22:00:17.1662516Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-01-11T22:00:17.2027323Z Cleaning up orphan processes