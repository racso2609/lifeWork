 kernel: [ 4743.782892] BUG: unable to handle page fault for address: 000000000000823f
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] #PF: supervisor write access in kernel mode
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] #PF: error_code(0x0002) - not-present page
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] PGD 0 P4D 0 
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] Oops: 0002 [#25270] SMP NOPTI
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] CPU: 1 PID: 9622 Comm: mkfs.vfat Tainted: G    B D W         5.4.0-65-generic #73-Ubuntu
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] Hardware name: LENOVO 81W0/LNVNB161216, BIOS E8CN25WW 10/13/2020
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RIP: 0010:blk_flush_plug_list+0xa5/0x110
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] Code: 4d c0 48 89 02 48 89 50 08 49 89 5c 24 10 49 89 5c 24 18 48 8b 45 c0 49 39 c7 74 31 48 8b 7d c0 89 75 bc 48 8b 47 08 48 8b 17 <48> 89 42 08 48 89 10 48 8b 47 10 4c 89 37 4c 89 6f 08 e8 d4 7d 91
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RSP: 0018:ffffb1c203f73e68 EFLAGS: 00010016
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RAX: ffffb1c203f73e70 RBX: ffffb1c203f73be0 RCX: ffffb1c203f73d5f
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RDX: 0000000000008237 RSI: 0000000000000001 RDI: ffffb1c203f73d5f
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RBP: ffffb1c203f73eb0 R08: 00000000001d548e R09: ffffffff951c5ba4
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] R10: ffffffff951971a8 R11: ffffb1c203f73d60 R12: ffffb1c203f73bd0
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] R13: dead000000000122 R14: dead000000000100 R15: ffffb1c203f73e70
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] FS:  00007ff48d45b740(0000) GS:ffffa08bb8840000(0000) knlGS:0000000000000000
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] CR2: 000000000000823f CR3: 000000014d03c000 CR4: 00000000003406e0
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] Call Trace:
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892]  schedule+0x75/0xb0
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892]  do_exit.cold+0x46/0xb5
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892]  ? do_group_exit+0x47/0xb0
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892]  rewind_stack_do_exit+0x17/0x20
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RIP: 0033:0x7ff48d5672c6
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] Code: Bad RIP value.
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RSP: 002b:00007fff264332f8 EFLAGS: 00000246 ORIG_RAX: 00000000000000e7
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RAX: ffffffffffffffda RBX: 00007ff48d66e610 RCX: 00007ff48d5672c6
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RDX: 0000000000000000 RSI: 000000000000003c RDI: 0000000000000000
Feb  1 11:35:12 racso-IdeaPad-3-14ADA05 kernel: [ 4743.782892] RBP: 0000000000000000 R08: 00000000000000e7 R09: ffffffffffffff78
Feb  1 11:35:12 racso-IdeaPad-3-14ADA