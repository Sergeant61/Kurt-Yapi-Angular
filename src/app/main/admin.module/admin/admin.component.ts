import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../rest.module/auth.service';
import { JqueryService } from '../../services/jquery.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
