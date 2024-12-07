const template = (data) => {
  const containers = data.map(
    (c) => `
<li class="container-info">
    <span class="container-image">${c.Image}</span>
    <span class="container-state${c.State === "running" ? " running" : ""}">${
      c.State
    }</span>
</li>
`,
  );
  return `
  <style>
.portainer {
  width: 100%;
  color: #fff;
}

.portainer .portainer-environment {
  text-align: center;
  margin-top: 3rem;
}

.portainer .container-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.portainer .container-list li {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 22px;
}

.portainer .container-image {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portainer .container-state {
  color: #222;
}

.portainer .container-state.running {
  color: #FFC773;
  text-shadow: 0px 0px 5px #FF9900;
}
</style>
<div class="portainer">
  <ul class="container-list">
    ${containers.join("")}
  </ul>
</div>
  `;
};
datasources[2].latestData?.data
  ? template(datasources[2].latestData?.data)
  : "LOADING";
