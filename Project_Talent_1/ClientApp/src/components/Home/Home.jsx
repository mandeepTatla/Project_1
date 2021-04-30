import React, { Component } from "react";
import { Header, Icon, Image } from "semantic-ui-react";

const Home = (props) => {
  return (
    <div>
      <Header as="h1" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>MVP Studios</Header.Content>
      </Header>
      <Image centered size="large" src="" />
      <Header sub size="large" style ={{ marginLeft : 20 }}>
        Project Talent
      </Header>
      <div style ={{ marginLeft : 20 }}>
        Welcome! The Talent Onboarding Task is designed to familiarise you with
        technologies that you will be utilising once you join the project team.
        While the instructions tell you what to do, they do not always
        necessarily tell you how to do it. This is deliberate as it is important
        for you to develop an independent drive to solve problems on your own.
        You are not allowed to ask your tutors or senior interns in MVP studios
        for help at this stage. You are allowed to discuss with other interns in
        your intake while working on the task.
      </div>
      <Header sub size="large" style ={{ marginLeft : 20 }}>
        Warning
      </Header>
      <div style ={{ marginLeft : 20 }}>
        Warning: There are a couple of ways to install React. If you are reading
        other tutorials on React, then be aware that the things taught in the
        tutorial might not be used in the onboarding task. For example, react
        routing might not using in the onboarding task. Also, following online
        tutorials and installing specific versions of npm packages might cause
        conflicts between different package versions.
      </div>
    </div>
  );
};

export default Home;
