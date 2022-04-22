//Global variables

//profile information
const overview = document.querySelector (".overview");
//list of repos
const repoList = document.querySelector (".repo-list");

const username = "CarolineSQ";



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
  displayRepoinfo (repoData);
};
//delete it for now --->gitRepos();
const displayRepoinfo = function(repos){
for (let repo of repos) {
   let listItem = document.createElement ("li");
   listItem.classList.add("repo");
   listItem.innerHTML = `<h3>${repo.name}</h3>`;
  repoList.append(listItem);
}
};
