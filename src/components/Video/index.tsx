import styles from './Video.module.scss';

export function Video() {
  return (
    <iframe
      className={styles.video}
      src="https://www.youtube.com/embed/SO03citaspo"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
      picture-in-picture"
      allowFullScreen
    />
  );
}
