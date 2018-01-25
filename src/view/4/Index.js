import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlay: false,
            isVisible: false,
            left: 0,
            title: '',
            content: '',
            index: 0
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleClick(index) {
        let left = 0;
        let title = '';
        let content = '';

        switch (index) {
            case 0:
                left = -2300;
                title = '上海电气电站集团公司';
                content = '上海电气集团股份有限公司（Shanghai Electric Group Company Limited），简称上海电气，是中国机械工业销售排名第一位的装备制造集团。公司前身为上海电气集团有限公司。经有限公司2004年9月8日召开的第五次股东会决议同意，并经上海市人民政府（沪府发改审[2004]第008）《关于同意设立上海电气集团股份有限公司的批复》批准，由有限公司全体股东作为发起人，按《公司法》有关规定将有限公司整体变更为上海电气集团股份有限公司。'
            case 1:
                left = -1700;
                title = '上海重型机器厂有限公司';
                content = '上海重型机器厂有限公司 前身始建于1934年；1962年启用上海重型机器厂厂名；2004年6月改制为上海重型机器厂有限公司（以下简称公司）；系上海电气集团股份有限公司（香港上市公司）成员企业，是上海电气重工集团所属骨干企业。公司注册资本12.5亿元人民币；主要生产电站、冶炼、轧钢、锻压、水利、矿山采掘和建材化工设备等，及电站、核电、冶金、机械、造船和化工等行业所需的高质量大型铸锻件。'
                break;
            case 2:
                left = -1100;
                title = '上海电机厂有限公司';
                content = '上海电气集团上海电机厂有限公司是上海电气集团属下的一家具有现代化生产规模的综合性电机制造大型企业，属于国家大型一档重点企业。'
                break;
            case 3:
                left = -550;
                title = '上海汽轮机厂有限公司';
                content = '上海电气电站设备有限公司上海汽轮机厂（简称STP）是由上海汽轮机厂和德国西门子公司共同投资组建的，是中国电站设备行业唯一大型合资企业。上海电气电站设备有限公司汽轮机厂建立于1953年，是中国第一家汽轮机制造厂。占地面积约1平方公里，拥有主要设备1300台；现有员工约3200人,工程技术人员占20%，高级工占39.3%；上汽以设计、制造火电汽轮机、核电汽轮机和重型燃气轮机为主，兼产船用汽轮机、风机等其它动力机械。产品国内市场份额占有率达到35%以上，汽轮机机组出口到东南亚多国。2006年汽轮机产量3600万千瓦，达到了全球第一。企业在消化吸收国际先进技术和管理方法的基础上，博采众长、融合提炼，引进型30万千瓦汽轮机已达到当今国际先进水平，为我国机械行业唯一的国家优质产品金质奖；60万千瓦汽轮机业绩卓越；超超临界100万千瓦汽轮机在全国首台投运成功，达到国际先进水平；上汽的主力产品已保持“上海市名牌产品”十二连冠。'
                break;
            case 4:
                left = -100;
                title = '上海华谊能源化工有限公司';
                content = '上海华谊能源化工有限公司于1997年6月24日在闵行区市场监督管理局登记成立。法定代表人王文西，公司经营范围包括煤炭（原煤），化工产品，化工原料及设备制作加工与安装等。'
                break;
            case 5:
                left = 100;
                title = '上海虹桥商务区管理委员会';
                content = '2012年3月9日，《上海市人民政府办公厅关于成立虹桥商务区开发建设指挥部的通知》（沪府办【2012】30号）指出，为加快推进虹桥商务区开发建设，形成责权相称、统一协调、运作高效的建设和管理体制，经市政府研究，决定成立虹桥商务区开发建设指挥部。指挥部办公室设在虹桥商务区管委会。'
                break;
            case 6:
                left = 600;
                title = '上海城开（集团）有限公司';
                content = '上海城开是由上海实业控股有限公司和徐汇区国资委共同投资，以房地产为主业、集商业、贸易、工业、服务业等为一体的企业集团，“上海城开”标识荣获上海市著名商标。'
                break;
            case 7:
                left = 1000;
                title = '上海燎申(集团)有限公司';
                content = '上海燎申（集团）有限公司是一家以汽车后服务+互联网为核心，及电子商务、主题商业、科技园为一体的投资运营商，创立于1997年，总部位于上海市吴中路1068号燎申国际大厦九楼。集团总注册资本8.5亿，目前已有23家下属企业，1000多名员工，年营业额5亿多元，年税收3000多万。我们长期同海内外3000多家企业合作，这些企业年交易总额达90余亿元，年税收总额达5亿多元，带动就业人数约10万人。'
                break;
            case 8:
                left = 1500;
                title = '华东师范大学';
                content = '华东师范大学（East China Normal University），简称“华东师大”，位于中国上海，由中华人民共和国教育部直属，位列“双一流”、“985工程”、“211工程”，入选国家“2011计划”、“111计划”、“海外高层次人才引进计划”，“长三角高校合作联盟”、“金砖国家大学联盟”、“亚太高校书院联盟”、“中日人文交流大学联盟”成员，设有研究生院和国家大学科技园，是中华人民共和国教育部、上海市人民政府和国家海洋局共建的综合性全国重点大学。'
                break;
            case 9:
                left = 1800;
                title = '上海电机学院';
                content = '上海电机学院（Shanghai DianJi University）是一所以工学为主，包含经济学、管理学、文学、艺术学等学科的全日制普通本科院校。是“服务国家特殊需求人才培养项目”专业学位研究生试点单位、教育部“卓越工程师”计划高校和上海市首批深化创新创业教育改革示范高校。'
                break;
        }

        this.setState({
            isVisible: true,
            left: left,
            title: title,
            content: content,
            index: index
        });
    }

    handleMouseDown() {
        this.setState({
            isPlay: true
        });
    }

    handleMouseUp() {
        this.setState({
            isPlay: false
        });
    }

    handleCancel(index) {
        this.setState({
            isVisible: false
        });
    }

    render() {
        return (
            <div className="index-4-div">
                <Modal
                    title={this.state.title}
                    style={{left: this.state.left}}
                    visible={this.state.isVisible}
                    maskClosable={true}
                    onOk={this.handleCancel.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div><img src={require('../../image/4-' + this.state.index + '.jpg')} style={{maxHeight: '100px'}} alt=''/></div>
                    {this.state.content}
                </Modal>
                <div className={'index-4-sky ' + (this.state.isPlay ? 'animation-play' : '')}>
                    <ul>
                        <li>
                            <img src={require('../../image/animation-sky.png')} alt=''/>
                        </li>
                        <li>
                            <img src={require('../../image/animation-sky.png')} alt=''/>
                        </li>
                    </ul>
                </div>
                <div className={'index-4-bg ' + (this.state.isPlay ? 'animation-play' : '')}>
                    <ul>
                        <li>
                            <div className="building-0" onClick={this.handleClick.bind(this, 0)}></div>
                            <div className="building-1" onClick={this.handleClick.bind(this, 1)}></div>
                            <div className="building-2" onClick={this.handleClick.bind(this, 2)}></div>
                            <div className="building-3" onClick={this.handleClick.bind(this, 3)}></div>
                            <div className="building-4" onClick={this.handleClick.bind(this, 4)}></div>
                            <div className="building-5" onClick={this.handleClick.bind(this, 5)}></div>
                            <div className="building-6" onClick={this.handleClick.bind(this, 6)}></div>
                            <div className="building-7" onClick={this.handleClick.bind(this, 7)}></div>
                            <div className="building-8" onClick={this.handleClick.bind(this, 8)}></div>
                            <div className="building-9" onClick={this.handleClick.bind(this, 9)}></div>
                            <img src={require('../../image/animation-backgroud.png')} alt=''/>
                        </li>
                        <li>
                            <div className="building-0" onClick={this.handleClick.bind(this)}></div>
                            <img src={require('../../image/animation-backgroud.png')} alt=''/>
                        </li>
                    </ul>
                </div>
                <img className="index-4-car" src={require('../../image/animation-car.png')} alt=''
                     onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}/>
            </div>
        );
    }
}


Index.propTypes = {};

export default connect(() => ({}))(Index);
