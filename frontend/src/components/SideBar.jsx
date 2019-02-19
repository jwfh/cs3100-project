import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
} from '@material-ui/core';
import { 
  Filter1, 
  Filter2, 
  Filter3, 
  Filter4, 
  Filter5, 
  Filter6 
} from '@material-ui/icons';

export class SideBar extends Component {

  createSideBarItem = (label, icon) => {
    return {label: label, icon: icon}
  }

  sideBarItems = [
    this.createSideBarItem('Primary', <Filter1/>),
    this.createSideBarItem('Elementary', <Filter2/>),
    this.createSideBarItem('Intermediate', <Filter3/>),
    this.createSideBarItem('Secondary', <Filter4/>),
    this.createSideBarItem('Undergraduate', <Filter5/>),
    this.createSideBarItem('Graduate', <Filter6/>)
  ]

  render() {
    const { sideBarOpen } = this.props;
    return (
      <div>
        <Drawer
          variant="persistent"
          anchor="left"
          open={sideBarOpen}
        >
          <List>
            {this.sideBarItems.map((item, index) => (
              <ListItem button key={item['label']}>
                <ListItemIcon>{item['icon']}</ListItemIcon>
                <ListItemText primary={item['label']} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}

export default SideBar
