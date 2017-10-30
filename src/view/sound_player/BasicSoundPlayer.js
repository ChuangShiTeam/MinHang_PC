import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlayButton, PrevButton, NextButton, Progress, Timer, VolumeControl } from 'react-soundplayer/components';
import { withSoundCloudAudio } from 'react-soundplayer/addons';

class BasicSoundPlayer extends Component {

	prevIndex() {
		this.props.soundCloudAudio.pause();
		this.props.prevIndex();
	}
	nextIndex() {
		this.props.soundCloudAudio.pause();
		this.props.nextIndex();
	}

	render() {
		const { track, currentTime, duration, soundCloudAudio} = this.props;
		return (
			<div className="p1 mb3 mt1 flex flex-center bg-darken-1 red rounded">
				<PrevButton
					className="flex-none h3 button button-narrow button-transparent button-grow rounded"
					onPrevClick={this.prevIndex.bind(this)}
				/>
				<PlayButton
					className="flex-none h4 button button-transparent button-grow rounded"
					{...this.props} />
				<NextButton
					className="flex-none h3 button button-narrow button-transparent button-grow rounded"
					onNextClick={this.nextIndex.bind(this)}
				/>
				<VolumeControl
					className='flex flex-center mr2'
					buttonClassName="flex-none h4 button button-transparent button-grow rounded"
					{...this.props}
				/>
				<Progress
					className="mt1 mb1 rounded"
					innerClassName="rounded-left"
					style={{width: '70%'}}
					value={(currentTime / duration) * 100 || 0}
					{...this.props}
				/>
				<Timer
					className="h6 mr1"
					style={{marginLeft: '5px'}}
					duration={duration ? duration / 1000 : 0}
					{...this.props} />
			</div>
		);
	}
}

BasicSoundPlayer.propTypes = {
	streamUrl: PropTypes.string.isRequired,
	trackTitle: PropTypes.string.isRequired,
	prevIndex: PropTypes.func.isRequired,
	nextIndex: PropTypes.func.isRequired

};

export default withSoundCloudAudio(BasicSoundPlayer);