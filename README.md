<b>MeowJS</b> --- <i>A simple fast JavaScript Library that does not require any built-in framework... it all runs through scripts. An user just requires any web browser with javascript enabled.</i> <br>
Licensed under "GNU GPL v2.0".<br>
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/Geek-Research-Lab/MeowJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)    [![Build Status](https://snap-ci.com/snap-ci/docs.snap-ci.com/branch/master/build_image)](https://snap-ci.com/Geek-Research-Lab/MeowJS/branch/master)
[![Code Climate](https://codeclimate.com/github/Geek-Research-Lab/MeowJS.svg)](https://codeclimate.com/github/Geek-Research-Lab/MeowJS) [![Build Status][travis-image]][travis-url]
[travis-url]: https://travis-ci.org/Geek-Research-Lab/MeowJS
[travis-image]: https://travis-ci.org/Geek-Research-Lab/MeowJS.svg?branch=master 
[![Coverage Status](https://coveralls.io/repos/Geek-Research-Lab/MeowJS/badge.svg)](https://coveralls.io/r/Geek-Research-Lab/MeowJS)
<br>
<br>
<b>How-To clone the repository?</b><br><p>
<b>1. For Windows users:-</b><br>
Cygwin must be installed along with openssl, g++-gcc, make, python, git and node.
</p>
<p><b>2. For Mac Users:- </b><br>
Install XCode along with Git and node.</p>
<p><b>3. For Ubuntu users:-</b><br>
    sudo apt-get install g++ curl libssl-dev apache2-utils<br>
    sudo apt-get install git-core<br>
Then, install node.<br><br>
<b> Then, Clone the repository using this command:</b><br>

    $git clone https://github.com/Geek-Research-Lab/MeowJS.git
<br>
<b>Alright, i don't use node, what to do? </b><br>
Then, directly download --- <a href="https://github.com/Geek-Research-Lab/MeowJS/archive/master.zip">click here</a><br>
or<br>
Download as per latest release --- <a href="https://github.com/Geek-Research-Lab/MeowJS/releases">click here</a><br>
Note:- The repository is active and gets updated everyday. So, everytime, you need to freshly update inorder to keep it updated.<br>
<br>
<b>Okay, done! Now, What am i going to do with all these scripts?</b><br>
<b><i>1. Initialize the link headers</b> [<a href="http://www.w3.org/Protocols/9707-link-header.html">1</a>, <a href="http://www.w3.org/wiki/LinkHeader">2</a>, <a href="https://github.com/Geek-Research-Lab/polymer-experiments/blob/webcomponents-mix/experiments/tests/preload/specs.md">3</a>]</i><br>
```js
    <link rel="stylesheet" href="test.css" as="css">
    <link rel="script" href="meowNinja.js" as="javascript">
```
<br><b><i>2. Add the scripts</b></i><br>
Build a script loader, Here i have built and named it as <code>meowNinja.js</code> <br>
```js
        var ref = window.document.getElementsByTagName("script")[0];
		var script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		if(cb && typeof(cb) === "function") {
			script.onLoad = cb;
		}
		return script;
```
The script loader is already initilized in link header...
<br>
<br><b><i>3. Load the scripts</b></i><br>
Load a main script (meow.js) along with any relevant script from the list of scripts in MeowJS<br>
```js
    <script src="meow.js"></script>
	<script src="Meow_Hello.js"></script>
	<script src="MeowDOM.js"></script>
	<script src="MeowString.js"></script>
	<script src="MeowUTF.js"></script>
	<script src="HiddenMeow.js"></script>
	<script src="Meow_HTTP.js"></script>
	<script src="Meow_IP.js"></script>
	<script src="Meow_Base.js"></script>
	<script src="Meow_Base64.js"></script>
	<script src="Meow_forEach.js"></script>
	<script src="Meow_Path.js"></script>
	<script src="Meow_EnvProcess.js"></script>
```
To know in detail --> refer <a href="https://github.com/Geek-Research-Lab/MeowJS/blob/master/status.md">status.md</a><br>
Let's take MeowFunText.js as an example and see how to load it.<br>
```js
    meowNinja("meow.js");
    meowNinja("MeowFunText.js");
```
Then, add it's script source.
```js
<script src="MeowFunText.js"></script>
```
<br>
<b>Testing:-</b><br>
For testing, Make use of these test files mentioned below. <br>
Try the example test file --- <a href="https://github.com/Geek-Research-Lab/MeowJS/blob/master/test.html">test.html</a>
 and <a href="https://github.com/Geek-Research-Lab/MeowJS/blob/master/test.css">test.css</a><br>
 Other test files (WebRTC) --- <a href="https://github.com/Geek-Research-Lab/MeowJS/tree/master/tests">click here</a> and <a href="https://github.com/Geek-Research-Lab/MeowJS/blob/master/tests2/frames.html">frames</a> <br>
 Failed tests -- <a href="https://github.com/Geek-Research-Lab/MeowJS/tree/master/NotAdded">click here</a>
<br>
///////////////////////////////////////<br>
<br>
Like this repository? <br>
Then, star it.<br>
<br>
Wanna stalk updates? <br>
Then, watch it.<br>
<br>
I am a developer... I wanna contribute?<br>
Sure! Fork this repo and send clean pull requests. <br>
<br>
Bugs/Questions/Suggestion!!!<br>
Then, open an issue.<br>
<br>
Currently, MeowJS is in-development and non-production ready.
<br><br>
A common <a href="https://github.com/Geek-Research-Lab/MeowJS/wiki">wiki</a> is also provided and the documentation is updated at most times. <br>
<b>--- Cloning the wiki ---</b><br>

    $git clone https://github.com/Geek-Research-Lab/MeowJS.wiki.git
<br>
<b>About:</b><br>
This is a <a href="http://geekresearchlab.net/mtechproject/">project</a> done by an individual. <br>
<br>
<b>Credits</b><br>
The existing research works/books/codes/articles that were used as reference or customized for this project, the list of those researchers/authors/developers/writers will be credited in the credits.md (contents not-yet updated, it will be updated later after the successful completion of this project since it's a tedious process).<br>
