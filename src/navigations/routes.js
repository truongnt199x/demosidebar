import Page1 from '../screens/Page1';
import Page2 from '../screens/Page2';
import Page3 from '../screens/Page3';
import Sidemenu from '../sidemenu/sideMenu';
import {DrawerNavigator} from 'react-navigation';
import { Dimensions } from 'react-native';
const {width,height} = Dimensions.get('window');
export default DrawerNavigator({
    Page1:{
        screen:Page1
    },
    Page2:{
        screen:Page2
    },
    Page3:{
        screen:Page3
    }
},{
    drawerWidth:width*0.9,
    contentComponent:Sidemenu
});