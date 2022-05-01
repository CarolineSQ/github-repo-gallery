//Global variables

//profile information
const overview = document.querySelector (".overview");
//list of repos
const repoList = document.querySelector (".repo-list");

const username = "CarolineSQ";

//repos section
const reposSection = document.querySelector(".repos");
//repo data Section
const repoDataSection = document.querySelector(".repo-data");

//Fetch API Json Data
const gitUserInfo = async function (){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserinfo (data);
};
gitUserInfo();

//Fetch & Display User Information

const displayUserinfo = function (data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  gitRepos();
};

//function to fetch the repos

const gitRepos = async function (){
  const userRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await userRepo.json();
  console.log(repoData);
  displayRepos(repoData);
};
//delete it for now --->gitRepos();
const displayRepos = function(repos){
for (let repo of repos) {
   let listItem = document.createElement ("li");
   listItem.classList.add("repo");
   listItem.innerHTML = `<h3>${repo.name}</h3>`;
  repoList.append(listItem);
}
};

//add click event
repoList.addEventListener ("click",function(e){
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
  gitRepoInfo(repoName);
  }
});
//function to get specific repo info

const gitRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
//create an array of languages
const fetchLanguages = await fetch(repoInfo.languages_url);
const languageData = await fetchLanguages.json();
//console.log(languageData);
//make a list of languages
const languages = [];
for (const language in languageData){
languages.push(language);
console.log(languages);
}

displayRepoInfo(repoInfo,languages);
};

//function to display specific repo info
const displayRepoInfo = function(repoInfo,languages){
  repoDataSection.innerHTML = "";
  const divItem = document.createElement("div");
  divItem.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
 <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
repoDataSection.append (divItem);
repoDataSection.classList.remove ("hide");
reposSection.classList.add ("hide");
};

