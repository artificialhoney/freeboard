const style = `
  <style>
.portainer {
  width: 100%;
  color: #fff;
}

.portainer .portainer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.portainer .portainer-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.8rem;
  font-weight: 600;
}

.portainer .portainer-state {
  background-color: #222;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  border: 2px solid #3d3d3d;
}

.portainer .portainer-state.running {
  background-color: #FFC773;
  box-shadow: 0px 0px 15px #FF9900;
  border-color: #FDF1DF;
}
</style>
`;

const template = (title, data) => {
  const running = data.every((c) => c.State === "running");
  return `
<div class="portainer">
  <div class="portainer-info">
      <h2 class="portainer-title">${title}</h2>
      <span class="portainer-state${running ? " running" : ""}"></span>
  </div>
</div>
  `;
};
datasources[2].latestData?.data && datasources[3].latestData?.data
  ? [
      style,
      template("Drone", datasources[2].latestData?.data),
      template("Hive", datasources[3].latestData?.data),
    ].join("")
  : "LOADING";
