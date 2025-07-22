import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/Shadcn/VideoPlayer';

const VideoPlayerSection = ({
  video_path,
  video_description,
}: {
  video_path?: string;
  video_description?: string;
}) => (
  <div className="w-full py-5">
    <VideoPlayer className="w-full overflow-hidden rounded-[12px] border">
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        slot="media"
        src={video_path}
      />
      <VideoPlayerControlBar >
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayer>
    {video_description && (
      <div className="text-sm text-gray-500 mt-2">{video_description}</div>
    )}
  </div>
);

export default VideoPlayerSection;
