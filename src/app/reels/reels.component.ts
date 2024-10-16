import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
interface Comment {
  username: string;
  date: string;
  text: string;
}

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.css']
})
export class ReelsComponent implements AfterViewInit {
  constructor(private rout: Router, private cdr: ChangeDetectorRef) { }
  @ViewChildren('videoElement') videoElements!: QueryList<ElementRef>;
  videos = [
    {
      id: 'sdflknjfkjnglkfngl1',
      src: '../../assets/ssstik.io_1728392441619.mp4',
      username: 'user1',
      description: 'Cool Video Description 1',
      music: 'Cool Music Track',
      likes: 120,
      comments: 45,
      shares: 20,
      isMuted: false,
      isfollow: false,
      currentTime: 0,
      isLiked: false,
      duration: 0
    },
    {
      id: 'sdflknjfkjnglkfngdfldsfdf1',
      src: '../../assets/ssstik.io_@SvestonWatches_1728393334586.mp4',
      username: 'user1',
      description: 'Cool Video Description 1',
      music: 'Cool Music Track',
      likes: 120,
      comments: 45,
      shares: 20,
      isLiked: false,
      isfollow: false,
      isMuted: false,
    },
    {
      id: 'sdflknjfkjnglkfandfgltrtyrty1',
      src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
      username: 'user1',
      description: 'Cool Video Description 1',
      music: 'Cool Music Track',
      likes: 120,
      comments: 45,
      shares: 20,
      isfollow: false,
      isLiked: false,
      isMuted: false,
    },
    {
      id: 'sdflknjfkjnglkfndf54645646gl1',
      src: '../../assets/1580455-hd_1920_1080_30fps.mp4',
      username: 'user2',
      description: 'Cool Video Description 2',
      music: 'Awesome Beat',
      likes: 220,
      comments: 78,
      shares: 45,
      isfollow: false,
      isLiked: false,
      isMuted: false,
    },
    // More videos
  ];
  activeTab: string = 'foryou';
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'foryou') {
      // this.loadForYouVideos();
    } else if (tab === 'following') {
      // this.loadFollowingVideos();
    }
  }
  touchStartX: number = 0;
  touchEndX: number = 0;


  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  // Track the X coordinate as the user moves their finger
  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  // Handle the swipe gesture when the user lifts their finger
  onTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX;

    // Check if the swipe is more than 50px in either direction
    if (swipeDistance > 50) {
      // Swiped right, switch to "Following" tab
      if (this.activeTab !== 'following') {
        this.setActiveTab('following');
      }
    } else if (swipeDistance < -50) {
      // Swiped left, switch to "For You" tab
      if (this.activeTab !== 'foryou') {
        this.setActiveTab('foryou');
      }
    }

    // Reset touch positions
    this.touchStartX = 0;
    this.touchEndX = 0;
  }
  observer: IntersectionObserver | undefined;
  ngAfterViewInit(): void {
    this.setupObserver();
  }
  setupObserver(): void {
    const options = {
      root: null,
      threshold: 0.75
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const videoElement = entry.target as HTMLVideoElement;

        if (entry.isIntersecting) {
          videoElement.play();
          this.updateQueryParams(videoElement);
        } else {
          videoElement.pause();
        }
      });
    }, options);

    this.videoElements.forEach((videoElement) => {
      this.observer?.observe(videoElement.nativeElement);
    });
  }
  togglePlayPause(videoElement: HTMLVideoElement): void {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
  like(video: any): void {
    if (video.isLiked) {
      video.likes -= 1; // Decrement likes
    } else {
      video.likes += 1; // Increment likes
    }
    video.isLiked = !video.isLiked; // Toggle like status
    this.cdr.detectChanges();
  }
  follow(video: any) {
    if (video.isfollow) {
      video.isfollow = false
    } else {
      video.isfollow = true
    }
    this.cdr.detectChanges();
  }


  comment(video: any): void {
    // Logic to handle commenting (e.g., open a modal or navigate to comments page)
    alert(`Commenting on ${video.username}'s video.`);
  }

  share(video: any): void {
    // Logic to handle sharing the video
    alert(`Sharing ${video.username}'s video.`);
  }

  updateQueryParams(videoElement: HTMLVideoElement): void {
    const index = this.videoElements.toArray().findIndex((el) => el.nativeElement === videoElement);
    if (index >= 0) {
      const video = this.videos[index];
      this.rout.navigate([], {
        queryParams: { uid: video.id }, // Use video.id to update query parameters
        queryParamsHandling: 'merge', // Merge with existing query params
      });
    } else {
      console.error('Video not found in the list.'); // Debugging line
    }
  }
  visible = false;
  placement: NzDrawerPlacement = 'bottom';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  isDrawerOpen = false;

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }
  comments: Comment[] = [];
  newComment: string = '';

  addComment() {
    if (this.newComment.trim()) {
      const newComment: Comment = {
        username: 'CurrentUser', // Replace with actual username
        date: 'Just now', // Ideally, you'd format the date
        text: this.newComment.trim()
      };
      this.comments.unshift(newComment);
      this.newComment = ''; // Clear the input after submission
    }
  }
  shareOnPlatform(platform: string) {
    const currentUrl = encodeURIComponent(window.location.href);
    const message = encodeURIComponent('');

    let shareUrl: string;

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${message}%20${currentUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${message}`;
        break;
      // Add more platforms as needed
      default:
        return;
    }

    // Open the share link in a new tab
    window.open(shareUrl, '_blank');
  }

  // Seek video when clicking on the progress bar
seekVideo(event: MouseEvent, videoElement: HTMLVideoElement) {
  const progressBar = event.currentTarget as HTMLDivElement;
  const clickX = event.clientX - progressBar.getBoundingClientRect().left;
  const width = progressBar.offsetWidth;
  const clickPercent = clickX / width;

  videoElement.currentTime = clickPercent * videoElement.duration;
}
progress = 0; // To track the progress of the video

// Update progress bar
updateProgress(videoElement: HTMLVideoElement) {
  this.progress = (videoElement.currentTime / videoElement.duration) * 100;
}
}
