import { Component, OnInit } from '@angular/core';
import { JqueryService } from '../../services/jquery.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-muhasebe',
  templateUrl: './muhasebe.component.html',
  styleUrls: ['./muhasebe.component.css']
})
export class MuhasebeComponent implements OnInit {

  constructor(public authService: AuthService, private jqueryService: JqueryService, private mScrollbarService: MalihuScrollbarService,
  ) { }

  ngOnInit(): void {
    const $ = this.jqueryService.jquery();

    $(document).ready(() => {

      this.mScrollbarService.initScrollbar('#sidebar', { theme: 'minimal' });

      // $('#sidebar').mCustomScrollbar({
      //   theme: 'minimal'
      // });

      $('#sidebarCollapse').on('click', () => {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
    });

  }


}
